// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AureusToken is ERC20, Ownable {
    IERC20 thisContract = IERC20(address(this));

    mapping (address => bool) approvedMarket;

    constructor() ERC20("Aureus","AURS"){
    }
    modifier validMarket(){
        require(approvedMarket[msg.sender]);
        _;
    }
    
    function loadTransaction(uint _amount) external {
        approve(address(this),_amount);
    }

    
    function marketSend(address _from,address _to,uint256 _amount) public validMarket(){
        thisContract.transferFrom(_from,_to,_amount);
    }


    function manageMarket(address _marketAddress, bool state) external onlyOwner(){
        approvedMarket[_marketAddress] = state;
    }



}
