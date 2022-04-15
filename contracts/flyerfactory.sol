// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/access/Ownable.sol";

contract FlyerFactory is Ownable{
    struct Flyer {
        string name;
        string description;
        string image;
        uint price;
        bool status;
    }

    Flyer[] public flyers;

    event NewFlyer(uint id, string name, string description, string image, uint price);

    mapping (uint => address) public flyerToOwner;
    mapping (address => uint) public ownerFlyerCount;

    function createFlyer(string memory _name, string memory _description, string memory _image, uint _price) public{
        flyers.push(Flyer(_name,_description,_image,_price,false));
        uint id = flyers.length - 1;
        flyerToOwner[id] = msg.sender;
        ownerFlyerCount[msg.sender] += 1;
        emit NewFlyer(id,_name,_description,_image,_price);
    }

    function getFlyerLength() external view returns(uint){
        return flyers.length;
    }
}
