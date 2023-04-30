/*
//This can create Litecoin Wallet by litecore-lib

const litecore = require("litecore-lib");


const createLtcAccount = async () => {
	

	// Use the Litecoin testnet
	const network = litecore.Networks.testnet;

	// Generate a random private key for the Litecoin testnet
	const privateKey = new litecore.PrivateKey(null, network);

	// Get the corresponding public key
	const publicKey = privateKey.toPublicKey();

	// Generate the Litecoin testnet address
	const address = new litecore.Address(publicKey, network);
	
	return {
		privateKey: privateKey.toString(),
		publicKey: publicKey.toString(),
		address: address.toString(),
  };
	

};
*/

/*

// Create Wallet via Block.io
// Unfortunately we have used all free quota
// Let's assign one for prototype


const createLtcAccount = async () => {
	
  try {
	const newUUID = uuidv4();
	const walletlabel = newUUID;
	const api_key = "578f-0868-73d8-7aba";
	const response = await axios.get(
	  `https://block.io/api/v2/get_new_address/?api_key=${api_key}&label=${walletlabel}`
	);
	res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Error fetching new address" });
  }
	

};

*/

//Assign LTC Address for prototype
//In real production, we can pay to block.io or run by litecoin-cli command 

const createLtcAccount = async () => {
	return {
		privateKey: "",
		publicKey: "",
		address: "QS4juvqHcAno8woPZZGF2aDCbkRAS8MNiW",
  };
};

module.exports = { createLtcAccount };
  