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


describe("Token Supply", function() {
  it("Should return the total token supply", async function() {

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    
    await token.deployed();

    console.log("LOGs are shown");
    
    expect(await token.totalSupply()).to.equal(1000000);
  });
});


describe("Transfer", function() {
  it("Should transfer tokens", async function() {

    
    const amount = 1000;
    const accounts = await ethers.getSigners();
    const sender   = accounts[0];
    const receiver = accounts[1];

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    const senderInitialAmount = await token.balanceOf(sender.address);
    await token.transfer(receiver.address, amount);

    expect(await token.balanceOf(receiver.address)).to.equal(amount);
    expect(await token.balanceOf(sender.address)).to.equal(senderInitialAmount.sub(amount));

  });
});