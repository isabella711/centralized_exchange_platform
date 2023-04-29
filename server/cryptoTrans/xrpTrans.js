//rcvAddress:rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe
import { RippleAPI } from "ripple-lib";
import { Client, xrpToDrops, dropsToXrp } from "xrpl";
const xrpl = require("xrpl");
function xrpTrans() {
  // const [serverInfo, setServerInfo] = useState({ "buildVersion:": "0.0.0" });

  const net = "wss://s.altnet.rippletest.net:51233";

  const paidAmount = 0;
  const client = new Client(net);

  const standby_wallet = xrpl.Wallet.fromSeed(
    "sEd7VZB9Tie9VXowLyv5o7g3gjm3NEt"
  );

  const rcvAddress = "";
  const senderPublicKey = standby_wallet.publicKey;
  const senderWallet = standby_wallet.address;

  async function sendPayment() {
    await client.connect();
    console.log("Creating a payment transaction");
    const prepared = await client.autofill({
      TransactionType: "Payment",
      Account: senderWallet,
      Amount: xrpToDrops(paidAmount),
      Destination: rcvAddress,
    });
    console.log(`prepared rcvAddress is: `, rcvAddress);
    // console.log("Creating a payment transaction", prepared);

    const signed = standby_wallet.sign(prepared);

    // -------------------------------------------------------- Submit signed blob
    const tx = await client.submitAndWait(signed.tx_blob);
    console.log(`tx`, tx);
    console.log("Identifying hash:", signed.hash);
    console.log("Signed blob:", signed.tx_blob);
    client.disconnect();
  }
}

export default xrpTrans;
