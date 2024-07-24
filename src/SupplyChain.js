import { ethers } from 'ethers';
import SupplyChainABI from './SupplyChainABI.json';

async function getProvider() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { provider, signer };
}

// Replace this with your actual deployed contract address
const supplyChainAddress = "0x541dE725391192403B6ECa51415db3622f294749"; 

async function getSupplyChainContract() {
  const { signer } = await getProvider();
  return new ethers.Contract(supplyChainAddress, SupplyChainABI, signer);
}

export default getSupplyChainContract;
