//When in webpage, it can generate a button when clicked, showing the address and private key of a random account.

import React, { useState } from 'react';
import Web3 from 'web3';

const MyComponent = () => {
  const web3 = new Web3('https://sepolia.infura.io/v3/40745b7b9da3492dbeb0cd9dff114a2d');
  const [account, setAccount] = useState(null);

  const handleCreateAccount = () => {
    const newAccount = web3.eth.accounts.create();
    console.log(newAccount);
    setAccount(newAccount);
  };

  return (
    <div>
      <button onClick={handleCreateAccount}>Create Account</button>
      {account && (
        <div>
          <p>Address: {account.address}</p>
          <p>Private Key: {account.privateKey}</p>
        </div>
      )}

    </div>
  );
};

export default MyComponent;