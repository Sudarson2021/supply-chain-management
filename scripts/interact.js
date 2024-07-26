async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", deployer.address);
  
    const supplyChainAddress = "0x891056E11C50Afd664A88f44F97b0D0b336dEBe4"; // Update this with your actual deployed contract address
    const SupplyChain = await ethers.getContractAt("SupplyChain", supplyChainAddress);
  
    // Create a new product
    try {
      const txCreateProduct = await SupplyChain.createProduct("Product1", "This is Product 1", {
        gasLimit: 1000000, // Increased gas limit
        gasPrice: ethers.utils.parseUnits('50', 'gwei') // Increased gas price
      });
      await txCreateProduct.wait();
      console.log("Product created successfully");
  
      // Get the product details
      const productCount = await SupplyChain.productCount();
      const product = await SupplyChain.products(productCount);
      console.log("Product Details:", product);
    } catch (error) {
      console.log("Error creating product:", error.message);
    }
  
    // Change the state of the product to InTransit
    try {
      const productId = 1; // Assuming we are changing the state of product with ID 1
      const txChangeState = await SupplyChain.changeState(productId, 1, {
        gasLimit: 1000000, // Increased gas limit
        gasPrice: ethers.utils.parseUnits('50', 'gwei') // Increased gas price
      }); // 1 corresponds to State.InTransit
      await txChangeState.wait();
      console.log("Product state changed successfully");
  
      // Get the updated product details
      const updatedProduct = await SupplyChain.products(productId);
      console.log("Updated Product Details:", updatedProduct);
    } catch (error) {
      console.log("Error changing product state:", error.message);
    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  