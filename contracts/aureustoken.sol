pragma solidity ^0.8;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AureusToken is ERC20 {
    constructor() ERC20("Aureus","AURS"){}
}
