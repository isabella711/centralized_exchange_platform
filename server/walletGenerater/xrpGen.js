const xrpl = require("xrpl");

const createXrpWallet = async () => {
  const net = "wss://s.altnet.rippletest.net:51233";
  const client = new xrpl.Client(net);
  let faucetHost = null;
  let amount = "100";
  await client.connect();
  console.log("Connected, funding wallet.");
  const my_wallet = (await client.fundWallet(null, { amount, faucetHost }))
    .wallet;
  console.log("Got a wallet.");
  console.log(my_wallet.address);
  console.log(my_wallet.privateKey, `publicKey`, my_wallet.publicKey);
  client.disconnect();
  console.log(`xrp`, my_wallet);
  return my_wallet;
};

const xrpTx = async (tx) => {
  const net = "wss://s.altnet.rippletest.net:51233";
  const client = new xrpl.Client(net);

  // const xrpTransHistory = async () => {
  await client.connect();
  console.log("Connected, funding wallet.");
  const response = await client.request({
    command: "tx",
    transaction: tx,
    binary: false,
  });

  console.log(`xrp ++++response>>>`, response);
  client.disconnect();
  // };
  // xrpTransHistory();
  return response;
};

function xrpFetch(address) {
  const net = "wss://s.altnet.rippletest.net:51233";
  const client = new xrpl.Client(net);

  const xrpWalletUpdate = async () => {
    await client.connect();
    console.log("Connected, funding wallet.");
    const response = await client.request({
      command: "account_info",
      account: address,
      // "rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt",
      ledger_index: "validated",
    });

    console.log(`xrp ++++response>>>`, response);
    client.disconnect();
  };

  return xrpWalletUpdate;
}

module.exports = { createXrpWallet, xrpFetch, xrpTx };

xrpTx("b9f3a0ca419220940a83f4fe73428d8e6dcb8b0ca7d572017d73bcf4180fa70d");
