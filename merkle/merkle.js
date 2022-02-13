const { ethers } = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("./firstWhiteList.json");

function hash(address, number) {
  let check_summed_address = ethers.utils.getAddress(address);
  if (check_summed_address != address) {
    console.log(`checksum ${address} to ${check_summed_address}`);
  }
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [address, number])
      .slice(2),
    "hex"
  );
}

const merkleTree = new MerkleTree(
  Object.entries(whitelist).map((item) => hash(...item)),
  keccak256,
  { sortPairs: true }
);
console.log(merkleTree.getHexRoot());

const proof = merkleTree.getHexProof(
  hash("0x000000000000000000000000000000000000dEaD", 1)
);
console.log(proof);
