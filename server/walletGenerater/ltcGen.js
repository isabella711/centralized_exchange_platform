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

module.exports = { createLtcAccount };
  