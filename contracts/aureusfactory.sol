pragma solidity ^0.8;
import "./aureustoken.sol"

contract AureusFactory is AureusToken{
    mapping (address => uint256) faucetReady;

    modifier isFaucetReady(){
        require(faucetReady[msg.sender] <= now);
        _;
    }
    // Faucet function to generate free test tokens

    function faucet() external isFaucetReady(){
        faucetReady[msg.sender] = now + 1 days;
        AureusToken._mint(msg.sender,5000);
    }
}

