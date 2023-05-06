const web3 = require("@solana/web3.js");
const bs58 = require("bs58");
const centralPrivateKey =
  "ZUFbNAu5oRGj796Dy6MMtvospxQAf1Jr5cLaoaiiFdJLos8SEqojsNYrPdhCzumcN5kUju6mbNssxqUrdVAdPQY";
const centralAddress = "4gL6TNJti8wNmsDJko4qmSeHwhqvp6Vg1YDpU2Qkj2AG";

const solanaTrans = async (secretKey, recevierAddress, amount) => {
  const from = web3.Keypair.fromSecretKey(bs58.decode(secretKey));
  const to = new web3.PublicKey(recevierAddress);
  console.log(`see to key`, from.publicKey);
  // Connect to cluster
  console.log(web3.clusterApiUrl("devnet"));
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );
  // Add transfer instruction to transaction
  console.log(`start sol trans...`, amount);
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: (web3.LAMPORTS_PER_SOL * amount).toFixed(0),
      // web3.LAMPORTS_PER_SOL / 100
    })
  );
  console.log(`start sig...`);
  // Sign transaction, broadcast, and confirm
  const signature = await web3
    .sendAndConfirmTransaction(connection, transaction, [
      web3.Keypair.fromSecretKey(bs58.decode(secretKey)),
    ])
    .catch((err) => {
      console.log(`show err`, err);
    });
  if (signature === undefined) {
    console.log("FAIL");
    return { message: "FAIL" };
  }
  console.log("SIGNATURE", signature);
  return { signature: signature, message: "OK" };
};

const buySol = async (toAddress, sendamount) => {
  return solanaTrans(centralPrivateKey, toAddress, sendamount);
};
const sellSol = async (clientPrivateKey, sendamount) => {
  return solanaTrans(clientPrivateKey, centralAddress, sendamount);
};

module.exports = { solanaTrans, sellSol, buySol };
