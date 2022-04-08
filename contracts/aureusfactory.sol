// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./aureustoken.sol";

contract AureusFactory is AureusToken{
    mapping (address => uint256) faucetReady;

    modifier isFaucetReady(){
        require(faucetReady[msg.sender] <= block.timestamp);
        _;
    }
    // Faucet function to generate free test tokens

    function faucet() external isFaucetReady(){
        faucetReady[msg.sender] = block.timestamp + 1 days;
        super._mint(msg.sender,5000);
    }
}

