// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;
 
contract Sharer {
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



contract VendingMachine {
   function buy(uint amount) public payable {
       if (amount > msg.value / 2 ether)
           revert("Not enough Ether provided.");
       // Alternative way to do it:
       require(
           amount <= msg.value / 2 ether,
           "Not enough Ether provided."
       );
       // Perform the purchase.
   }
}

