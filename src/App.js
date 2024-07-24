import React from 'react';
import CreateProduct from './components/CreateProduct';
import ChangeState from './components/ChangeState';
import TransferOwnership from './components/TransferOwnership';

function App() {
  return (
    <div className="App">
      <h1>Supply Chain Management</h1>
      <CreateProduct />
      <ChangeState />
      <TransferOwnership />
    </div>
  );
}

export default App;
