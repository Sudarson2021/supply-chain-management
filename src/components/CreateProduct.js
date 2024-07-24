import React, { useState } from 'react';
import { ethers } from 'ethers';
import getSupplyChainContract from '../SupplyChain';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createProduct = async () => {
    try {
      const supplyChainContract = await getSupplyChainContract();
      console.log('Contract instance:', supplyChainContract);

      // Adjusted gas limit and gas price
      const tx = await supplyChainContract.createProduct(name, description, {
        gasLimit: 300000,
        gasPrice: ethers.parseUnits('50', 'gwei'),
      });
      console.log('Transaction:', tx);

      const receipt = await tx.wait();
      console.log('Transaction receipt:', receipt);

      alert('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      alert(`Error creating product: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createProduct}>Create</button>
    </div>
  );
};

export default CreateProduct;
