const web3 = require("@solana/web3.js");
const bs58 = require('bs58');

(async () => {
  // Connect to cluster
  console.log(web3.clusterApiUrl("devnet"));
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );
  // Uncomment the below command to test your connection to your node
  //console.log(await connection.getEpochInfo())

  // Generate a new random public key
  const from = web3.Keypair.generate();
  console.log(`from.publicKey>>>`, from.publicKey.toString());
  let converted =  bs58.encode(from.secretKey)
  let uncoverted = bs58.decode(converted)
  console.log(`from.secretKey<<<`,from.secretKey)
  console.log(bs58.encode(from.secretKey))
  console.log(bs58.decode(converted))
  const u8array = new Uint8Array(uncoverted.buffer, uncoverted.byteOffset, uncoverted.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  // convert the bs58 string back unit8 Array
  console.log(`u8array>>>`,u8array)
  console.log(bs58.encode(u8array)===bs58.encode(from.secretKey))

  console.log(
    connection.getBalance(from.publicKey).then((res) => {
      console.log(res);
    })
  );
  const airdropSignature = await connection.requestAirdrop(
    from.publicKey,
    web3.LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdropSignature);

  //   // Generate a new random public key
  //   const to = web3.Keypair.generate();
  //   // Add transfer instruction to transaction
  //   const transaction = new web3.Transaction().add(
  //     web3.SystemProgram.transfer({
  //       fromPubkey: from.publicKey,
  //       toPubkey: to.publicKey,
  //       lamports: web3.LAMPORTS_PER_SOL / 100,
  //     })
  //   );

  //   // Sign transaction, broadcast, and confirm
  //   const signature = await web3.sendAndConfirmTransaction(
  //     connection,
  //     transaction,
  //     [from]
  //   );
  //   console.log("SIGNATURE", signature);
})();
