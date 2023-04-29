const { createSolAccount } = require("./solGen");
const { createEthAccount } = require("./ethGen");
const { createXrpWallet } = require("./xrpGen");
const { createBtcAccount } = require("./btcGen");
const { createLtcAccount } = require("./ltcGen");

const createMultiWallet = async () => {
  const solAccount = await createSolAccount();
  const ethAccount = await createEthAccount();
  const xrpAccount = await createXrpWallet();
  const btcAccount = await createBtcAccount();
  const ltcAccount = await createLtcAccount();
  return { solAccount, ethAccount, xrpAccount, btcAccount, ltcAccount };
};

module.exports = createMultiWallet;