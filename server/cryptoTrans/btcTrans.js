const axios = require("axios");
const bitcore = require("bitcore-lib");
// let address ='mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD'
const centralAddress = "mhnJkZVKvmvLRan2RJpWHQaSHDjrkWsagG";
const centralAddressPrivateKey =
  "ed595f2318c5fd44c5643a11f06442f20104eb218e8099bc6280605f9550a6bd";
const spareAddressPrivateKey =
  "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa";
const spareAddress = "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD";

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
    let availableUTXO = (_availableArr) => {
      let chosenUtxo = _availableArr.find((u) =>
        u.vout.find(
          (v) =>
            (v.value > amount || v.value === amount) &&
            v.scriptpubkey_address === from
        )
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
      console.log(`voutIndex>>`, voutIndex);
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
  tx.to(to, amount - 250);
  tx.to(from, value - amount);
  tx.change(from);
  // console.log(`getFee`, tx.getFee());
  tx.fee(250);
  tx.sign(privateKeyHex);

  console.log(`toObject`, tx.toObject());
  // tx.serialize();

  // console.log(`tx.serialize`, tx.serialize());

  // push rawtransaction:
  const result = await axios
    .post(
      `https://api.blockcypher.com/v1/btc/test3/txs/push?token=242062db6a9044d3a7c63e7cc8fbb35a`,
      { tx: tx.toString() }
    )
    .then((res) => {
      console.log(`res>>>>`, res);
      // console.log(tx.serialize());
      return res;
    });

  return result;
  // return;
};

const buyBtc = async (toAddress, sendamount) => {
  console.log(`toAddressBTC>>>`, {
    centralAddress,
    toAddress,
    centralAddressPrivateKey,
    sendamount,
  });
  return btcTransaction(
    centralAddress,
    toAddress,
    centralAddressPrivateKey,
    Number((sendamount * 100000000).toFixed(0))
  );
};
const sellBtc = async (sellAddress, clientPrivateKey, sendamount) => {
  console.log(`sendamount>>> sat`, Number((sendamount * 100000000).toFixed(0)));
  return btcTransaction(
    sellAddress,
    centralAddress,
    clientPrivateKey,
    Number((sendamount * 100000000).toFixed(0))
  );
};

module.exports = { btcTransaction, buyBtc, sellBtc };
