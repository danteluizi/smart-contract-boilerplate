import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { get, execute, deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  let deploymentName = "BoredApeCloneV1";
  let contractName = "BoredApeClone";
  await deploy(deploymentName, {
    from: deployer,
    log: true,
    contract: contractName,
  });
  let baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
  let tx = await execute(
    deploymentName,
    { from: deployer },
    "setBaseURI",
    baseURI
  );
  console.log(tx);
};
export default func;
func.tags = ["deployRinkeby"];
// 0x447FBc5718fC6a11237dFe70C3af7F0689fCbb81 = deployment on rinkeby
