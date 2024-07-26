// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    enum State { Created, InTransit, Delivered }

    struct Product {
        uint id;
        string name;
        string description;
        address owner;
        State state;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    event ProductCreated(uint id, string name, string description, address owner);
    event StateChanged(uint id, State state);

    function createProduct(string memory _name, string memory _description) public {
        productCount++;
        products[productCount] = Product(productCount, _name, _description, msg.sender, State.Created);
        emit ProductCreated(productCount, _name, _description, msg.sender);
    }

    function changeState(uint _id, State _state) public {
        require(products[_id].id != 0, "Product does not exist");
        require(products[_id].owner == msg.sender, "Only the owner can change the state");
        products[_id].state = _state;
        emit StateChanged(_id, _state);
    }

    function transferOwnership(uint _id, address _newOwner) public {
        require(products[_id].id != 0, "Product does not exist");
        require(products[_id].owner == msg.sender, "Only the owner can transfer ownership");
        products[_id].owner = _newOwner;
    }
}
