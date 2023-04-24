const xrpl = require("xrpl");

function xrpGen() {
  const net = "wss://s.altnet.rippletest.net:51233";
  const client = new xrpl.Client(net);
  let faucetHost = null;
  let amount = "100";
  const createNewWallet = async () => {
    await client.connect();
    console.log("Connected, funding wallet.");
    const my_wallet = (await client.fundWallet(null, { amount, faucetHost }))
      .wallet;
    console.log("Got a wallet.");
    console.log(my_wallet.address);
    console.log(my_wallet.privateKey,`publicKey`,my_wallet.publicKey )
    client.disconnect();
  };
  console.log(createNewWallet());
  return;
};

function xrpFetch() {
  const net = "wss://s.altnet.rippletest.net:51233";
  const client = new xrpl.Client(net);

  const xrpWallet = async () => {
    await client.connect();
    console.log("Connected, funding wallet.");
    const response = await client.request({
      command: "account_info",
      account: "rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt",
      ledger_index: "validated",
    });

    console.log(`xrp ++++response>>>`, response);
    client.disconnect();
  };

  console.log(`rey>>>>`, xrpWallet());
  return;
};


module.exports ={xrpGen,xrpFetch}