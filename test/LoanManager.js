const ProxyEntry = artifacts.require("Proxy");
const Wallet = artifacts.require("Wallet");
const LoanManager = artifacts.require("LoanManager");
const HeartToken = artifacts.require("HeartToken");
const LoanDB = artifacts.require("LoanDB");
const truffleAssert = require("truffle-assertions");
contract("LoanManager", (accounts) => {
  let proxy;
  let wallet;
  let loanManager;
  let heartToken;
  let loanDB;
  const requester = accounts[1];
  const lender = accounts[2];
  const amount = 1000000000;
  beforeEach(async () => {
    proxy = await ProxyEntry.new();
    wallet = await Wallet.new();
    loanManager = await LoanManager.new();
    heartToken = await HeartToken.new();
    loanDB = await LoanDB.new();
    await proxy.addContract("LoanManager", loanManager.address);
    await proxy.addContract("LoanDB", loanDB.address);
    await proxy.addContract("Wallet", wallet.address);
    await proxy.addContract("HeartToken", heartToken.address);

    await loanDB.setContainerEntry(proxy.address);
    await heartToken.setContainerEntry(proxy.address);
    await wallet.setContainerEntry(proxy.address);
    await loanManager.setContainerEntry(proxy.address);

    await loanManager.init();
  });
  it("Should able to make request", async () => {
    const requestTx = await proxy.postRequest(amount, { from: requester });
    const _debtNo = requestTx.receipt.rawLogs[0].data.slice(0, 66);
    const borrower = await loanDB.getBorrowerofDebt(_debtNo);
    assert.equal(requester, borrower, "Can not make request properly");
  });

  it("Should able to lend request", async () => {
    const requestTx = await proxy.postRequest(amount, { from: requester });
    const _debtNo = requestTx.receipt.rawLogs[0].data.slice(0, 66);
    await proxy.lendLoan(_debtNo, { from: lender, value: amount });
    const actualLender = await loanDB.getLenderofDebt(_debtNo);
    assert.equal(lender, actualLender, "Not the same lender");
    const requesterWallet = await wallet.depositsOf(requester);
    assert.equal(amount, requesterWallet, "Requester does not receive money");
  });

  it("Should able to pay back debt", async () => {
    const requestTx = await proxy.postRequest(amount, { from: requester });
    const _debtNo = requestTx.receipt.rawLogs[0].data.slice(0, 66);
    await proxy.lendLoan(_debtNo, { from: lender, value: amount });
    const interest = await loanDB.getInterestofDebt(_debtNo);
    const amountofDebt = amount + interest;
    await proxy.payLoan(_debtNo, { from: requester, value: amountofDebt });
    const lenderWallet = await wallet.depositsOf(lender);
    assert.equal(amountofDebt, lenderWallet, "Lender does not receive money");
  });
});
