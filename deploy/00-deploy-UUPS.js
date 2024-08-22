const { network } = require("hardhat");
const {
    networkconfig,
    developmentChains,
} = require("../hardhat-config-helper");
require("dotenv").config();
const { verify } = require("../utility/verify");
const { ethers, upgrades } = require("hardhat");


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    let ChainlinkDatafeedTest;
    log('chainId:' + chainId)
    log(deployer)

    const LogicV1 = await ethers.getContractFactory('LogicV1');
    
    myLogicV1 = await upgrades.deployProxy(LogicV1, {kind: 'uups'});
    console.log(myLogicV1.address);


    await myLogicV1.SetLogic("aa", 1);
    let value = await myLogicV1.GetLogic("aa");
    console.log(value)
    const LogicV2 = await ethers.getContractFactory('LogicV2');


    myLogicV2 =  await upgrades.upgradeProxy(myLogicV1, LogicV2);
    console.log(myLogicV2.address);

    let value1 = await myLogicV2.GetLogic("aa");

    console.log(value1)



    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await verify(ChainlinkDatafeedTest.address, [process.env.DATAFEED_ETHUSD]);
    // }
};
module.exports.tags = ["all", "UUPS"];
