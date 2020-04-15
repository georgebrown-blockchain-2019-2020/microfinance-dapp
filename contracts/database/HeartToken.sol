pragma solidity ^0.5.8;
import "../lib/ERC20.sol";
import "../container/Contained.sol";


//name this contract whatever you'd like
contract HeartToken is ERC20, Contained {
    fallback() external {
        revert();
    }

    receive() external payable {
        revert();
    }

    string public name;
    uint8 public decimals;
    string public symbol;
    string public version = "H1.0";

    constructor() public {
        name = "Heart Token"; // Set the name for display purposes
        decimals = 0; // Amount of decimals for display purposes
        symbol = "HEART"; // Set the symbol for display purposes
    }

    function getToken(address buyer, uint256 value)
        external
        onlyContract(CONTRACT_LOAN_MANAGER)
    {
        _mint(buyer, value);
    }

    function removeToken(address remover, uint256 value)
        external
        onlyContained()
    {
        require(balanceOf(remover) >= value, "not enough token to burn");
        _burn(remover, value);
    }
}
