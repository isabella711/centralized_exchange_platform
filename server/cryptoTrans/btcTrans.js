const axios = require("axios");
const bitcore = require("bitcore-lib");
// let address ='mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD'

const btcTransaction = async (from, to, privateKey, amount) => {
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
    address: from,
    script: vout,
    satoshis: amount,
  });

  const privateKeyHex = new bitcore.PrivateKey(privateKey);

  const tx = bitcore.Transaction();
  tx.from(utxo)
    .fee(10000)
    .to(to, amount - 10000)
    .change(from)
    .sign(privateKeyHex);

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
      // console.log(`res>>>>`, res);
      // console.log(tx.serialize());
    });
  return result;
};

module.exports = { btcTransaction };

// btcTransaction(
//   "mmHAHPcPBkT9GFeQrsz7EhFLJtbtQL9CToD",
//   "mohjSavDdQYHRYXcS3uS6ttaHP8amyvX78",
//   "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa"
// );

// btcTransaction(
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "n18Mrmav6WpiL7thrfFDany6cMVDEkXsAA",
//   "8ef01556f6fffbd5dd7f45ef6bcfe947781df25a92f5412661f1e35b2272aed0",
//   100000
// );
