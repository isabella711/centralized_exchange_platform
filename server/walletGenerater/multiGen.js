const { createSolAccount } = require("./solGen");
const { createEthAccount } = require("./ethGen");
const { createXrpWallet } = require("./xrpGen");
const { createBtcAccount } = require("./btcGen");

const createMultiWallet = async () => {
  const solAccount = await createSolAccount();
  const ethAccount = await createEthAccount();
  const xrpAccount = await createXrpWallet();
  const btcAccount = await createBtcAccount();
  return { solAccount, ethAccount, xrpAccount, btcAccount };
};

module.exports = createMultiWallet;
