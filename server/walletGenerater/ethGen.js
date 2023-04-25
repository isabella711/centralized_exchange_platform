const Web3 = require("web3");
const createEthAccount = async () => {
  const web3 = await new Web3(
    "https://sepolia.infura.io/v3/40745b7b9da3492dbeb0cd9dff114a2d"
  );
  const newAccount = await web3.eth.accounts.create();
  console.log(`new eth`, newAccount);

  return newAccount;
};

module.exports = { createEthAccount };
