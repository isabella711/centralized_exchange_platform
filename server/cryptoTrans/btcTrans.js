const axios = require("axios");
const bitcore = require("bitcore-lib");
// let address ='mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD'

const btcTransaction = async (from, to, privateKey) => {
  let txid,
    vout = "";
  await axios
    .get(`https://blockstream.info/testnet/api/address/${from}/txs`)
    .then((res) => {
      txid = res.data[0].txid;
      vout = res.data[0].vout.find(
        (v) => v.scriptpubkey_address === from
      ).scriptpubkey;
    });
  console.log({ txid, vout });

  var utxo = new bitcore.Transaction.UnspentOutput({
    txId: txid,
    outputIndex: 0,
    address: "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
    script: vout,
    satoshis: 6000,
  });

  const privateKeyHex = new bitcore.PrivateKey(privateKey);

  const tx = bitcore.Transaction();
  tx.from(utxo).fee(1000).to(to, 5000).change(from).sign(privateKeyHex);

  console.log(tx.toObject());
  tx.serialize();

  console.log(tx.serialize());

  // push rawtransaction:
  const result = await axios
    .post(
      `https://api.blockcypher.com/v1/bcy/test/txs/push?token=6319d95f7a834a24a0d441b3bb495906`,
      { tx: txid }
    )
    .then((res) => {
      console.log(`res>>>>`, res);
    });
  return result;
};

btcTransaction(
  "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
  "mohjSavDdQYHRYXcS3uS6ttaHP8amyvX78",
  "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa"
);
