
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");


const createLtcAccount = async () => {
  //try {
	const newUUID = uuidv4();
	const walletlabel = newUUID;
	const api_key = "578f-0868-73d8-7aba";
	const response = await axios.get(
	  `https://block.io/api/v2/get_new_address/?api_key=${api_key}&label=${walletlabel}`
	);
	res.send(response.data);
  //} catch (error) {
  //  res.status(500).send({ error: "Error fetching new address" });
  //}
  
  return response
};

module.exports = { createLtcAccount };
  