// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IFlyerOwnership.sol";

interface IAureusToken {
    function marketSend(address _from,address _to,uint256 _amount) external;
    function balanceOf(address account) external view returns (uint256);
}

contract DeFlyersMarket is Ownable {
    IAureusToken aureusAddress;
    IFlyerOwnership deflyTokenAddress;

    function setCurrencyAddres(address _aureusAddress) public onlyOwner() {
        aureusAddress = IAureusToken(_aureusAddress) ;
    }

    function setTokenAddress(address _deflyTokenAddress) public onlyOwner(){
       deflyTokenAddress = IFlyerOwnership(_deflyTokenAddress);
    }

    // First transaction amount must be loaded and token on sale then execute this exchange
    function exchange(uint _tokenId,uint _amount) external{
        require(deflyTokenAddress.getPrice(_tokenId) == _amount && aureusAddress.balanceOf(msg.sender) >= _amount);
        // Send currency
        aureusAddress.marketSend(msg.sender,deflyTokenAddress.ownerOf(_tokenId),_amount);
        // Send token
        deflyTokenAddress.marketSend(deflyTokenAddress.ownerOf(_tokenId),msg.sender,_tokenId);
        // Sale status on false to avoid any other instant trade
        deflyTokenAddress.closeSale(_tokenId);
    }



}
