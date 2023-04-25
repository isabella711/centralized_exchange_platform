import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

 const buyLitecoin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/api/sendtoaddress', { address, amount });
    if (response.data.success) {
      setMessage(`Transaction successful! TXID: ${response.data.txid}`);
    } else {
      setMessage('Transaction failed.');
    }
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
};

	return (
		<div className="App">
			<h1>Mock Litecoin Exchange</h1>
			<form onSubmit={buyLitecoin}>
				<div>
					<label htmlFor="address">Address:</label>
					<input
						type="text"
						id="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
					</div>
					<div>
						<label htmlFor="amount">Amount (LTC):</label>
					<input
					type="number"
					id="amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					step="0.00000001"
					min="0.00000001"
					required
					/>
				</div>
				<button type="submit">Buy Litecoin</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default App;