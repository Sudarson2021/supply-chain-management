import React, { useState } from 'react';
import { ethers } from 'ethers';
import getSupplyChainContract from '../SupplyChain';

const TransferOwnership = () => {
  const [productId, setProductId] = useState('');
  const [newOwner, setNewOwner] = useState('');

  const transferOwnership = async () => {
    try {
      const supplyChainContract = await getSupplyChainContract();
      console.log('Contract instance:', supplyChainContract);

      const tx = await supplyChainContract.transferOwnership(productId, newOwner, {
        gasLimit: 200000,
        gasPrice: ethers.parseUnits('20', 'gwei'),
      });
      console.log('Transaction:', tx);

      const receipt = await tx.wait();
      console.log('Transaction receipt:', receipt);

      alert('Product ownership transferred successfully');
    } catch (error) {
      console.error('Error transferring product ownership:', error);
      alert(`Error transferring product ownership: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Transfer Product Ownership</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Owner Address"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />
      <button onClick={transferOwnership}>Transfer Ownership</button>
    </div>
  );
};

export default TransferOwnership;
