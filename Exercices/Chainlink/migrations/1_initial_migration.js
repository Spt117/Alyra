const Chainlink2 = artifacts.require("Chainlink2");

let id = 8746;
module.exports = function (deployer) {
  deployer.deploy(Chainlink2, id);
};
