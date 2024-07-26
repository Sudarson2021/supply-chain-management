import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");

  try {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy({
      gasLimit: 200000, // Reduced gas limit to stay within balance
      gasPrice: ethers.utils.parseUnits('20', 'gwei'), // Reduced gas price
    });
    await supplyChain.deployed();
    console.log("SupplyChain deployed to:", supplyChain.address);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
