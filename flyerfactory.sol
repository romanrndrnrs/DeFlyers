pragma solidity ^0.8;
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract FlyerFactory is Ownable{
    struct Flyer {
        string name;
        string description;
        string image;
        uint price;
    }

    Flyer[] public flyers;

    event NewFlyer(uint id, string name);

    mapping (uint => address) public flyerToOwner;
    mapping (address => uint) public ownerFlyerCount;

    function _createFlyer(string memory _name, string memory _description, string memory _image, uint memory _price){
        uint id = flyers.push(Flyer(_name,_description,_image,_price)) - 1;
        flyerToOwner[id] = msg.sender;
        ownerFlyerCount[msg.sender] += 1;
        emit NewFlyer(id,_name);
    }
}
