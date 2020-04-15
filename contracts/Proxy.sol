pragma solidity ^0.5.8;

import "./container/BaseContainer.sol";
import "./modules/LoanManager.sol";
import "./modules/Wallet.sol";

/**
    @title Proxy
    @dev All public calls that changes the state of blockchain should come through here
    @author leodinh
 */

contract Proxy is BaseContainer {
    function postRequest(uint256 _amount) external return(bytes32){
        bytes32 _debtNo = (sha256(abi.encodePacked(msg.sender, now)));
        LoanManager(getAddressOfLoanManager()).requestLoan(_debtNo,msg.sender,_amount);
        return _debtNo;
    }

    function lendLoan(bytes32 _debtNo) external {
        LoanManager(getAddressOfLoanManager()).lendLoan.value(msg.value)(_debtNo,msg.sender);
    }

    function payLoan(bytes32 _debtNo) external {
        LoanManager(getAddressOfLoanManager()).payLoan.value(msg.value)(_debtNo,msg.sender);
    }

    function burnToken(uint256 _amount) external {
        Wallet(getAddressOfWallet()).removeToken(msg.sender,_amount);
    }
}