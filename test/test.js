const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { impersonateAccount, resetChain } = require("./testUtils.js");


describe("Test Some SmartContract", () => {
  let smartContractName = ""
  let accounts;
  let admin, adminAddress;

  beforeEach(async () => {
    // set admin address
    accounts = await ethers.getSigners();
    admin = accounts[0];
    adminAddress = await admin.getAddress();
    // deploy
    contractFactory = await ethers.getContractFactory(smartContractName);
  });
  it("test something", async () => {
  })
});
