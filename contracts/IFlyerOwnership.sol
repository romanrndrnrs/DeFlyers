// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

interface IFlyerOwnership {
    function ownerOf(uint256 _tokenId) external view returns (address);
    function getPrice(uint256 _tokenId) external view returns (uint);
    function marketSend(address _from, address _to,uint256 _tokenId) external;
    function transferFrom(address _from, address _to, uint256 _tokenId) external;
    function changeSaleStatus(uint _id) external;
    function closeSale(uint _id) external;
}
