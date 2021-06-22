const { expect } = require("chai");

describe("Deploy", function() {
  it("Contract owner must be the one of the deployer", async function() {

    const accounts = await ethers.getSigners();

    const account = accounts[0];
    console.log(account.address);

    const Token = await ethers.getContractFactory("Token", account);
    const token = await Token.deploy();
    
    await token.deployed();

    
    expect(await token.owner()).to.equal(account.address);
  });
});


describe("Token", function() {
  it("Should return the total token supply", async function() {

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    
    await token.deployed();

    console.log("LOGs are shown");
    
    expect(await token.totalSupply()).to.equal(1000000);
  });
});