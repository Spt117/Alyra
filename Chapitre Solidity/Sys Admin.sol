// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";


contract Admin is Ownable {

    mapping (address => bool) private _whitelist ;
    mapping (address => bool) private _blacklist ;

    event Whitelisted(address _addr);
    event Blacklisted(address _addr);

    function whitelist(adress _addr) public OnlyOwner {
        require(!_whitelist[_addr],"Deja Whiteliste");
        require(!_blacklist[_addr], "Deja Blackliste");
        _whitelist[_addr] = true;
        emit Whitelisted(_addr);
    }

    function isWhitelisted(adress _addr) public view returns(bool) {
        return _whitelist[_addr];
    }

    function Blacklisted(adress _addr) public OnlyOwner {
        require(!_whitelist[_addr],"Deja Whiteliste");
        require(!_blacklist[_addr], "Deja Blackliste");
        _blacklist[_addr] = true;
        emit Blacklisted(_addr);
    }

    function isBlacklisted(_addr) public view returns(bool) {
        return _blacklist[_addr];
    }

}