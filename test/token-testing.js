const { expect } = require("chai");

describe("Token", function() {
  it("Should return the total token supply", async function() {

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    
    await token.deployed();

    console.log("LOGs are shown");
    
    expect(await token.totalSupply()).to.equal(1000000);
  });
});