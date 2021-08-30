var CryptoZombie = artifacts.require("../contracts/ZombieOwnerShip.sol");
module.exports = function(deployer) {
    deployer.deploy(CryptoZombie);
};
