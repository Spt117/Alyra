// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.9;

contract Require {
     function sendHalf(address payable addr) public payable returns (uint balance) {
       require(msg.value % 2 == 0, "Even value required.");
       uint balanceBeforeTransfer = address(this).balance;
       addr.transfer(msg.value / 2);
       // Since transfer throws an exception on failure and
       // cannot call back here, there should be no way for us to
       // still have half of the money.
       assert(address(this).balance == balanceBeforeTransfer - msg.value / 2);
       return address(this).balance;
   }
}