// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/access/Ownable.sol";


pragma solidity 0.8.13;

contract SimpleStorage {

    event DataStored(uint _data, address _addr);

    uint storageData;



    function get() public view returns (uint) {
        return storageData;
    }

    function set(uint _num) public {
        require(_num>0, 'Vous ne pouvez pas mettre une valeur nulle !');
        storageData = _num;
         emit DataStored(_num, msg.sender);
    }

}


