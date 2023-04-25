const { createSolAccount } = require("./solGen");
const { createEthAccount } = require("./ethGen");
const { createXrpWallet } = require("./xrpGen");

const createMultiWallet = async () => {
  const solAccount = await createSolAccount();
  const ethAccount = await createEthAccount();
  const xrpAccount = await createXrpWallet();
  return { solAccount, ethAccount, xrpAccount };
};

module.exports = createMultiWallet;
