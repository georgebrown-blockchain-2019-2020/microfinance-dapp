pragma solidity ^0.6.0;

import "./container/BaseContainer.sol";
import "./modules/LoanManager.sol";
import "./database/HeartToken.sol";


/**
    @title Proxy
    @dev All public calls that changes the state of blockchain should come through here
    @author leodinh
 */

contract Proxy is BaseContainer {
    function postRequest(uint256 _amount) external returns (bytes32) {
        bytes32 _debtNo = (sha256(abi.encodePacked(msg.sender, now)));
        LoanManager(getAddressOfLoanManager()).requestLoan(
            _debtNo,
            msg.sender,
            _amount
        );
        return _debtNo;
    }

    function lendLoan(bytes32 _debtNo) external payable{
        LoanManager(getAddressOfLoanManager()).lendLoan.value(msg.value)(
            _debtNo,
            msg.sender
        );
    }

    function payLoan(bytes32 _debtNo) external payable{
        LoanManager(getAddressOfLoanManager()).payLoan.value(msg.value)(
            _debtNo,
            msg.sender
        );
    }

    function burnToken(uint256 _amount) external {
        HeartToken(payable(getAddressOfHeartToken())).removeToken(msg.sender, _amount);
    }
}
