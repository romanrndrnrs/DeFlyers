pragma solidity ^0.8;
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "./flyerfactory.sol"

contract FlyerOwnership is FlyerFactory, ERC721Full {
    modifier onlyOwnerOf(uint _id) {
        require(flyerToOwner[_id] == msg.sender );
        _;
    }


    mapping (uint => address) flyerApproval;
    function balanceOf(address _owner) external view returns (uint256){
        return ownerFlyerCount[_owner];
    }
    function ownerOf(uint256 _tokenId) external view returns (address){
        return flyerToOwner[_tokenId];
    }
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable onlyOwnerOf(_tokenId){
        ownerFlyerCount[_from]--;
        ownerFlyerCount[_to]++;
        flyerToOwner[_tokenId] = _to;
        emit Transfer(_from,_to,_tokenId);
    }
}
