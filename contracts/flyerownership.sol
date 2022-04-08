// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./flyerfactory.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IFlyerOwnership.sol";

contract FlyerOwnership is FlyerFactory, ERC721 {
    IFlyerOwnership thisContract = IFlyerOwnership(address(this));

    modifier onlyOwnerOf(uint _id) {
        require(flyerToOwner[_id] == msg.sender );
        _;
    }


    modifier canBuy(uint _id) {
        require(flyers[_id].status);
        _;
    }


    mapping (uint => address) flyerApproval;
    mapping (address => bool) approvedMarket;

    modifier validMarket(){
        require(approvedMarket[msg.sender]);
        _;
    }

    constructor() ERC721("DeFlyers","DFLY") {
    }
    
    function balanceOf(address _owner) public view virtual override returns (uint256){
        return ownerFlyerCount[_owner];
    }
    function ownerOf(uint256 _tokenId) public view virtual override returns (address){
        return flyerToOwner[_tokenId];
    }

    function getPrice(uint256 _tokenId) external view returns (uint){
        return flyers[_tokenId].price;
    }


    function approve(address to, uint256 tokenId) public virtual override onlyOwnerOf(tokenId){
        flyerApproval[tokenId] = to;
    }


    function marketSend(address _from,address _to,uint256 _tokenId) public validMarket() canBuy(_tokenId){
        thisContract.transferFrom(_from,_to,_tokenId);
    }

    function manageMarket(address _marketAddress, bool state) external onlyOwner(){
        approvedMarket[_marketAddress] = state;
    }

    // This contract is approved only if the status of the sale is true
    function closeSale(uint _id) public validMarket(){
        thisContract.changeSaleStatus(_id);
    }

    // Change the status of your flyer => if true someone can buy it
    function changeSaleStatus(uint _id) public {
        require(ownerOf(_id) == msg.sender || msg.sender == flyerApproval[_id]);
        if(flyers[_id].status){
            flyers[_id].status = false;
            // Only the owner can transfer now
            approve(address(0),_id);
        }
        else{
            flyers[_id].status = true;
            // The contract can transfer
            approve(address(this),_id);
        }
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public override {
        require(_to != address(0));
        require(msg.sender == flyerToOwner[_tokenId] || msg.sender == flyerApproval[_tokenId]);
        require(_from == flyerToOwner[_tokenId]);
        ownerFlyerCount[_from]--;
        ownerFlyerCount[_to]++;
        flyerToOwner[_tokenId] = _to;
        emit Transfer(_from,_to,_tokenId);
    }


    
}
