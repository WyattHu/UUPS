// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LogicV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize() initializer public {
      __Ownable_init();
      __UUPSUpgradeable_init();
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function _authorizeUpgrade(address) internal override onlyOwner {}

    mapping(string => uint256) private logic;

    event logicSetted(string indexed _key, uint256 _value);

    function SetLogic(string memory _key, uint256 _value) external {
        logic[_key] = _value;
        emit logicSetted(_key, _value);
    }

    function GetLogic(string memory _key) public view returns (uint256){
        return logic[_key];
    }
}