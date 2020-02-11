const MicroFinance = artifacts.require("./MicroFinance.sol");

contract("MicroFinance", accounts =>{
    it("Should store requests rightly",async ()=>{
        const instance = await MicroFinance.deployed();
        const requestedMoney = 1000;
        await instance.request(requestedMoney,{from: accounts[0]});
        const actualRequestedMoney = await instance.getDebtFromDebtInfo.call();
        assert.equal(actualRequestedMoney, requestedMoney, "Stored wrongly requested money");
        const lender = await instance.getLenderFromDebtInfo.call();
        assert.equal(lender,"0x0000000000000000000000000000000000000000", "Cannot have the lender");
        const interest = (requestedMoney*2)/100;
        const actualInterest = await instance.getInterestFromDebtInfo.call();
        assert.equal(actualInterest, interest, "Interest have to be equal 2% of requested money");
    })
    it("Should give loan to right account",async ()=> {
        const instance = await MicroFinance.deployed();
        const requestedMoney = 1000;
        await instance.request(requestedMoney,{from: accounts[0]});
        await instance.lend(accounts[0],{from: accounts[1],value: requestedMoney});
        const lender = await instance.getLenderFromDebtInfo.call();
        assert.equal(lender, accounts[1], "Wrong lender address");
        const debtorList = await instance.getDebtorsList.call({from:accounts[1]});
        assert.include(debtorList, accounts[0], "Doesn't add to the list of debtors");
        const debtorWalletValue = await instance.getWalletValue.call();
        assert.equal(debtorWalletValue, requestedMoney, "Doesn't give money to borrower");
    })
    it("Should pay back money to right account",async ()=>{
        const instance = await MicroFinance.deployed();
        const requestedMoney = 1000;
        const interest = (requestedMoney*2)/100;
        await instance.request(requestedMoney,{from: accounts[1]});
        await instance.lend(accounts[1],{from: accounts[2],value: requestedMoney});
        await instance.payBack({from: accounts[1],value: (requestedMoney+interest)});
        const lenderWalletValue = await instance.getWalletValue.call({from:accounts[2]});
        assert.equal(lenderWalletValue, (requestedMoney+interest), 
        "Doesn't turn back right amount of money for lender");
        const lender = await instance.getLenderFromDebtInfo.call({from: accounts[1]});
        assert.equal(lender,"0x0000000000000000000000000000000000000000", "Cannot have the lender");
    })
    it("Should be able to withdraw money",async ()=>{
        const instance = await MicroFinance.deployed();
        const requestedMoney = "10000000000000000";
        await instance.request(requestedMoney,{from: accounts[3]});
        await instance.lend(accounts[3],{from: accounts[4],value: requestedMoney});
        const balanceOfAccount = await web3.eth.getBalance(accounts[3]);
        await instance.withDraw(requestedMoney,{from: accounts[3]});
        const updatedBalanceOfAccount = await web3.eth.getBalance(accounts[3]);
        assert.isAbove(parseInt(updatedBalanceOfAccount), parseInt(balanceOfAccount), "can't not withdraw");
    })
})
