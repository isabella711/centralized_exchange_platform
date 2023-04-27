const Web3 = require("web3");
const createEthAccount = async () => {
  const web3 = await new Web3(
    "https://sepolia.infura.io/v3/40745b7b9da3492dbeb0cd9dff114a2d"
  );
  const newAccount = await web3.eth.accounts.create();
  console.log(`new eth`, newAccount);

  return newAccount;
};

const ethersFetch = async (address) => {
  const etherscanApi = require("etherscan-api").init(
    "4DGSFE9926FZNSQ7TTJDV83KAC8GF41MSC",
    "sepolia"
  );
  const call = await etherscanApi.account.balance(address);
  // .then((balance) => {
  //   console.log(`ethcall>>>`, balance);
  //   return balance.result / 10e17;
  // })
  // .catch((err) => {
  //   console.log(`err>>>eth`, err);
  // });
  return call;
};
module.exports = { createEthAccount, ethersFetch };
// ethersFetch("0x0902a667d6a3f287835e0a4593cae4167384abc6").then((res) => {
//   console.log(`0x0902a667d6a3f287835e0a4593cae4167384abc6>>`, res);
// });
