// 01_deploy.js 

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Simple1= artifacts.require('Simple1');

module.exports = async function (deployer) {

 const instance = await deployProxy(Simple1, [3], { deployer, initializer: 'set' });

 console.log('Deployed', instance.address)

};
