const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { impersonateAccount, resetChain } = require("./testUtils.js");

describe("Test BoredApeClone", () => {
  let smartContractName = "BoredApeClone";
  let accounts;
  let minter, minterAddress;
  let admin, adminAddress;
  let boredApeClone;

  beforeEach(async () => {
    // set admin address
    accounts = await ethers.getSigners();
    admin = accounts[0];
    adminAddress = await admin.getAddress();
    minter = accounts[1];
    minterAddress = await minter.getAddress();
    // deploy
    contractFactory = await ethers.getContractFactory(smartContractName);
    boredApeClone = await contractFactory.deploy();
  });
  it("test set minter", async () => {
    await boredApeClone.setMinter(minterAddress);
    expect(await boredApeClone.minter()).to.eq(minterAddress);
  });
  it("test non minter mint and minter mint", async () => {
    await boredApeClone.setMinter(minterAddress);
    let to = minterAddress;
    let quantity = 10;
    await expect(
      boredApeClone.connect(admin).mint(to, quantity)
    ).to.be.revertedWith("only minter");
    await boredApeClone.connect(minter).mint(to, quantity);
    expect(await boredApeClone.balanceOf(minterAddress)).to.eq(quantity);
  });
  it("test set baseURI and tokenURI", async () => {
    let baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    await boredApeClone.setBaseURI(baseURI);
    expect(await boredApeClone.baseURI()).to.eq(baseURI);
    // current minter is admin
    let to = minterAddress;
    let quantity = 10;
    await boredApeClone.connect(admin).mint(to, quantity);
    expect(await boredApeClone.tokenURI(0)).to.eq(`${baseURI}${0}`);
  });
});
