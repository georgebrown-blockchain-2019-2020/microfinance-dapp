pragma solidity ^0.5.8;
import "../library/SafeMath.sol";
contract MicroFinance {
    using SafeMath for uint256;
    struct debt {
        address lender;
        uint256 amountOfDebt;
        uint256 interest;
    }
    mapping(address => debt) debtInfo;
    mapping(address => address[]) debtorsList;
    mapping(address => uint256) userWallet;
    function request(uint256 amount) public {
        require(
            debtInfo[msg.sender].lender == address(0),
            "are already lended"
        );
        require(amount > 100 wei, "the amount is too small to borrow");
        uint256 interestValue = (amount.mul(2)).div(100);
        debtInfo[msg.sender] = debt(address(0), amount, interestValue);
    }
    function lend(address to) public payable {
        require(to != msg.sender, "cannot give loan by yourself");
        require(debtInfo[to].lender == address(0), "are already lended");
        require(debtInfo[to].amountOfDebt != 0, "do not have any debt");
        require(msg.value >= debtInfo[to].amountOfDebt, "not enough money");
        debtInfo[to].lender = msg.sender;
        debtorsList[msg.sender].push(to);
        userWallet[to] = userWallet[to].add(msg.value);
    }
    function payBack() public payable {
        require(
            debtInfo[msg.sender].lender != address(0),
            "do not have any debt"
        );
        uint256 valueNeedtoPay = debtInfo[msg.sender].amountOfDebt +
            debtInfo[msg.sender].interest;
        require(msg.value >= valueNeedtoPay, "not enought money");
        address lender = debtInfo[msg.sender].lender;
        userWallet[lender] = userWallet[lender].add(msg.value);
        debtInfo[msg.sender] = debt(address(0), 0, 0);
    }
    function withDraw(uint256 amount) public {
        uint256 amountWallet = userWallet[msg.sender];
        address payable receiver = msg.sender;
        require(amount != 0, "the amount can't be empty");
        require(amountWallet >= amount, "not enought money");
        userWallet[msg.sender] = userWallet[msg.sender].sub(amount);
        receiver.transfer(amount);
    }
    function getWalletValue() public view returns (uint256) {
        return userWallet[msg.sender];
    }
    function getDebtorsList() public view returns (address[] memory) {
        return debtorsList[msg.sender];
    }
    function getLenderFromDebtInfo() public view returns (address) {
        return debtInfo[msg.sender].lender;
    }
    function getDebtFromDebtInfo() public view returns (uint256) {
        return debtInfo[msg.sender].amountOfDebt;
    }
    function getInterestFromDebtInfo() public view returns (uint256) {
        return debtInfo[msg.sender].interest;
    }
}
