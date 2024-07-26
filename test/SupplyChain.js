const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupplyChain", function () {
  let SupplyChain, supplyChain, owner, addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    SupplyChain = await ethers.getContractFactory("SupplyChain");
    supplyChain = await SupplyChain.deploy({
      gasLimit: 1000000, // Adjust gas limit if needed
      gasPrice: ethers.utils.parseUnits('50', 'gwei') // Adjust gas price if needed
    });
    await supplyChain.deployed();
  });

  it("Should create a product", async function () {
    const txCreateProduct = await supplyChain.createProduct("Product1", "This is Product 1", {
      gasLimit: 1000000, // Adjust gas limit if needed
      gasPrice: ethers.utils.parseUnits('50', 'gwei') // Adjust gas price if needed
    });
    await txCreateProduct.wait();

    const productCount = await supplyChain.productCount();
    expect(productCount).to.equal(1);

    const product = await supplyChain.products(productCount);
    expect(product.name).to.equal("Product1");
    expect(product.description).to.equal("This is Product 1");
    expect(product.owner).to.equal(owner.address);
    expect(product.state).to.equal(0); // 0 corresponds to State.Created
  });

  it("Should change the state of a product", async function () {
    const productId = 1; // Assuming we are changing the state of product with ID 1
    const txChangeState = await supplyChain.changeState(productId, 1, {
      gasLimit: 1000000, // Adjust gas limit if needed
      gasPrice: ethers.utils.parseUnits('50', 'gwei') // Adjust gas price if needed
    }); // 1 corresponds to State.InTransit
    await txChangeState.wait();

    const updatedProduct = await supplyChain.products(productId);
    expect(updatedProduct.state).to.equal(1); // 1 corresponds to State.InTransit
  });

  it("Should transfer ownership of a product", async function () {
    const productId = 1;
    const txTransferOwnership = await supplyChain.transferOwnership(productId, addr1.address, {
      gasLimit: 1000000, // Adjust gas limit if needed
      gasPrice: ethers.utils.parseUnits('50', 'gwei') // Adjust gas price if needed
    });
    await txTransferOwnership.wait();

    const updatedProduct = await supplyChain.products(productId);
    expect(updatedProduct.owner).to.equal(addr1.address);
  });
});
