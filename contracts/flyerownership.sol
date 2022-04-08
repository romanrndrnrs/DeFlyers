pragma solidity ^0.8;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./flyerfactory.sol";

contract FlyerOwnership is FlyerFactory, ERC721 {
    modifier onlyOwnerOf(uint _id) {
        require(flyerToOwner[_id] == msg.sender );
        _;
    }


    mapping (uint => address) flyerApproval;
    constructor() ERC721("DeFlyers","DFLY") {}
    
    function balanceOf(address _owner) public view virtual override returns (uint256){
        return ownerFlyerCount[_owner];
    }
    function ownerOf(uint256 _tokenId) public view virtual override returns (address){
        return flyerToOwner[_tokenId];
    }

    function _transfer(address _)

    function approve(address to, uint256 tokenId) public virtual override onlyOwnerOf(tokenId){
        flyerApproval[tokenId] = to;
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public override{
        require(_to != address(0));
        require(msg.sender == flyerToOwner[_tokenId] || msg.sender == flyerApproval[_tokenId]);
        ownerFlyerCount[_from]--;
        ownerFlyerCount[_to]++;
        flyerToOwner[_tokenId] = _to;
        emit Transfer(_from,_to,_tokenId);
    }
}
