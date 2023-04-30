const axios = require("axios");
const bitcore = require("bitcore-lib");
// let address ='mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD'

const btcTransaction = async (from, to, privateKey, amount) => {
  let txid,
    vin,
    vout = "";
  await axios
    .get(`https://blockstream.info/testnet/api/address/${from}/txs`)
    .then((res) => {
      console.log(`res>>>`, res.data[0].vin[0].prevout.scriptpubkey_address);
      txid = res.data[0].txid;
      vin = res.data[0].vin.find((v) => v.prevout.scriptpubkey_address === from)
        ?.prevout.scriptpubkey;
      console.log(`find scriptpubkey_address from vin`, vin);
      vout = res.data[0].vout.find(
        (v) => v.scriptpubkey_address === from
      )?.scriptpubkey;
      console.log(`find scriptpubkey_address from vout`, vout);
    });
  console.log({ txid, vout, vin });
  const vinOrvout = vout ? vout : vin;
  var utxo = new bitcore.Transaction.UnspentOutput({
    txId: txid,
    outputIndex: 0,
    address: from,
    script: vinOrvout,
    satoshis: amount,
  });

  const privateKeyHex = new bitcore.PrivateKey(privateKey);

  const tx = bitcore.Transaction();
  tx.from(utxo)
    .to(to, amount - 1000)
    .change(from)
    .fee(1000)
    .sign(privateKeyHex);

  console.log(tx.toObject());
  tx.serialize();

  console.log(`tx.serialize`, tx.serialize());

  // push rawtransaction:
  const result = await axios
    .post(
      `https://api.blockcypher.com/v1/btc/test3/txs/push?token=6319d95f7a834a24a0d441b3bb495906`,
      { tx: tx.serialize() }
    )
    .then((res) => {
      console.log(`res>>>>`, res);
      // console.log(tx.serialize());
    });
  return result;
};

module.exports = { btcTransaction };

// btcTransaction(
//   "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa",
//   5000
// );

// btcTransaction(
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "n18Mrmav6WpiL7thrfFDany6cMVDEkXsAA",
//   "8ef01556f6fffbd5dd7f45ef6bcfe947781df25a92f5412661f1e35b2272aed0",
//   5000
// );

// btcTransaction(
//   "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa",
//   5000
// );

// btcTransaction(
//   "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa",
//   5000
// );
