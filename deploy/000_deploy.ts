import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { get, execute, deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  let deploymentName = ""
  let contractName = ""
  await deploy(deploymentName, {
    from: deployer,
    log: true,
    contract: contractName,
  });
};
export default func;
func.tags = ["deployRinkeby"];


