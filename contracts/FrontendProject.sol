// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract FrontendProject {
    uint8 public amount;
    string public name;

    event SetAmount(address indexed sender, uint8 val);

    event SetName(address indexed sender, string names);

    function setAmount(uint8 _myAmount) external {
        amount = _myAmount;

        emit SetAmount(msg.sender, _myAmount);
    }

    function setName(string memory _myName) external {
        name = _myName;

        emit SetName(msg.sender, _myName);
    }

    function getAmount() public view returns (uint) {
        return amount;
    }

    function getName() public view returns (string memory) {
        return name;
    }
}
