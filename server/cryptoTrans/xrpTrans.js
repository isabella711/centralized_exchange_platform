//Address:rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt
const RippleAPI = require("ripple-lib");
const { Client, xrpToDrops, dropsToXrp } = require("xrpl");
const xrpl = require("xrpl");
const centralPrivateKey = "sEd7VZB9Tie9VXowLyv5o7g3gjm3NEt"; // here is actually seed
const centralAddress = xrpl.Wallet.fromSeed(centralPrivateKey).classicAddress;
async function xrpTrans(rcvAddress, senderPrivateKey, amount) {
  // const [serverInfo, setServerInfo] = useState({ "buildVersion:": "0.0.0" });

  const net = "wss://s.altnet.rippletest.net:51233";
  // const paidAmount = 100;
  const client = new Client(net);

  const standby_wallet = xrpl.Wallet.fromSeed(senderPrivateKey);

  const senderWallet = standby_wallet.classicAddress;
  async function sendPayment() {
    await client.connect();
    console.log("Creating a payment transaction");
    const prepared = await client.autofill({
      TransactionType: "Payment",
      Account: senderWallet,
      Amount: xrpToDrops(amount),
      Destination: rcvAddress,
    });
    console.log(`prepared rcvAddress is: `, rcvAddress);
    // console.log("Creating a payment transaction", prepared);

    const signed = standby_wallet.sign(prepared);

    // -------------------------------------------------------- Submit signed blob
    const tx = await client.submitAndWait(signed.tx_blob);
    // console.log(`tx`, tx);
    console.log("Identifying hash:", signed.hash);
    console.log("Signed blob:", signed.tx_blob);
    client.disconnect();
    return tx;
  }
  const tx = await sendPayment();
  console.log(`txxx`, tx);
  return { tx: tx, msg: "OK" };
}

const buyXrp = async (rcvAddress, amount) => {
  return xrpTrans(rcvAddress, centralPrivateKey, Number(amount).toFixed(4));
};

const sellXrp = async (senderPrivateKey, amount) => {
  return xrpTrans(centralAddress, senderPrivateKey, parseInt(amount));
};

module.exports = { xrpTrans, buyXrp, sellXrp };
