var AureusToken = artifacts.require("./AureusToken");
module.exports = function(deployer) {
    deployer.deploy(AureusToken);
};
