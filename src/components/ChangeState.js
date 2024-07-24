import React, { useState } from 'react';
import { ethers } from 'ethers';
import getSupplyChainContract from '../SupplyChain';

const ChangeState = () => {
  const [productId, setProductId] = useState('');
  const [state, setState] = useState('');

  const changeState = async () => {
    try {
      const supplyChainContract = await getSupplyChainContract();
      console.log('Contract instance:', supplyChainContract);

      const tx = await supplyChainContract.changeState(productId, state, {
        gasLimit: 200000,
        gasPrice: ethers.parseUnits('20', 'gwei'),
      });
      console.log('Transaction:', tx);

      const receipt = await tx.wait();
      console.log('Transaction receipt:', receipt);

      alert('Product state changed successfully');
    } catch (error) {
      console.error('Error changing product state:', error);
      alert(`Error changing product state: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Change Product State</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New State (0: Created, 1: InTransit, 2: Delivered)"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <button onClick={changeState}>Change State</button>
    </div>
  );
};

export default ChangeState;
