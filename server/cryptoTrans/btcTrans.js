const axios = require("axios");
const bitcore = require("bitcore-lib");
// let address ='mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD'

const btcTransaction = async (from, to, privateKey, amount) => {
  const searchAvailableUTXO = (allOutputArry) => {
    let unspentOutputArr = allOutputArry.filter((utxo) =>
      utxo.vout.some((v) => v.scriptpubkey_address === from)
    );
    let unspentOutputIdArr = [];
    unspentOutputArr.forEach((v) => unspentOutputIdArr.push(v.txid));
    let allVinIdArr = [];
    allOutputArry.forEach((s) => {
      s.vin.forEach((v) => {
        allVinIdArr.push(v.txid);
      });
    });

    let availableTxid = unspentOutputIdArr.filter(
      (item) => !allVinIdArr.includes(item)
    );
    console.log(`availableTxid>>>`, availableTxid);
    let availableArr = unspentOutputArr.filter((u) =>
      availableTxid.includes(u.txid)
    );
    console.log(`availableArr>>>`, availableArr);
    let availableUTXO = (_availableArr) => {
      let chosenUtxo = _availableArr.find((u) =>
        u.vout.find((v) => v.value > amount)
      );
      return chosenUtxo;
    };
    let result = availableUTXO(availableArr);
    console.log(`result>>>`, result);
    return result;
  };
  let txid,
    vout = "";
  let value = 0;
  let voutIndex = 0;
  await axios
    .get(`https://blockstream.info/testnet/api/address/${from}/txs`)
    .then((res) => {
      const availableUTXO = searchAvailableUTXO(res.data);
      console.log(`check`, availableUTXO);
      txid = availableUTXO.txid;
      vout = availableUTXO.vout.find(
        (v) => v.scriptpubkey_address === from
      )?.scriptpubkey;
      voutIndex = availableUTXO.vout.findIndex(
        (v) => v.scriptpubkey_address === from
      );
      value = availableUTXO.vout.find(
        (v) => v.scriptpubkey_address === from
      ).value;
    });
  console.log(`>>>value`, value);
  console.log({ txid, vout });
  var utxo = new bitcore.Transaction.UnspentOutput({
    txId: txid,
    outputIndex: voutIndex,
    address: from,
    script: vout,
    satoshis: amount,
  });

  const privateKeyHex = new bitcore.PrivateKey(privateKey);

  const tx = bitcore.Transaction();
  tx.from(utxo);
  tx.to(to, amount - 200);
  tx.change(from);
  tx.fee(200);
  tx.sign(privateKeyHex);

  console.log(`toObject`, tx.toObject());
  tx.serialize();

  console.log(`tx.serialize`, tx.serialize());

  // push rawtransaction:
  const result = await axios
    .post(
      `https://api.blockcypher.com/v1/btc/test3/txs/push?token=242062db6a9044d3a7c63e7cc8fbb35a`,
      { tx: tx.serialize() }
    )
    .then((res) => {
      console.log(`res>>>>`, res);
      console.log(tx.serialize());
    });
  return result;
};

module.exports = { btcTransaction };

// btcTransaction(
//   "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa",
//   69352
// );

// btcTransaction(
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
//   "8ef01556f6fffbd5dd7f45ef6bcfe947781df25a92f5412661f1e35b2272aed0",
//   5000
// );

// btcTransaction(
//   "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa",
//   4000
// );

// btcTransaction(
//   "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
//   "mhnJkZVKvmvLRan2RJpWHQaSHDjrkWsagG",
//   "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa",
//   4500
// );

// btcTransaction(
//   "mhnJkZVKvmvLRan2RJpWHQaSHDjrkWsagG",
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "ed595f2318c5fd44c5643a11f06442f20104eb218e8099bc6280605f9550a6bd",
//   5000
// );

// btcTransaction(
//   "mwFXkwtotyQ5GxZQ9upC8VcNANB6PkE1Zc",
//   "mhnJkZVKvmvLRan2RJpWHQaSHDjrkWsagG",
//   "8ef01556f6fffbd5dd7f45ef6bcfe947781df25a92f5412661f1e35b2272aed0",
//   6666
// );
