// 02_upgrade.js 

const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Simple1= artifacts.require('Simple1');

const Simple2= artifacts.require('Simple2');

module.exports = async function (deployer) {

 const existing = await Simple1.deployed();

 const instance = await upgradeProxy(existing.address, Simple2, { deployer });

 console.log("Upgraded", instance.address);

 };
