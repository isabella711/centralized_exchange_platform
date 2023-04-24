const axios = require("axios");

const bitcore = require("bitcore-lib");

var utxo = new bitcore.Transaction.UnspentOutput({
  txId: "a67645dcf8dd5b47e3d5e429ecc233a668a058390c7063741136e932f0b0f137",
  outputIndex: 0,
  address: "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
  script: "76a9143f34f05440c780bec34c040d8f19f11e2722309a88ac",
  satoshis: 10000,
});

const privateKey = new bitcore.PrivateKey(
  "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa"
);

const tx = bitcore.Transaction();
tx.from(utxo)
  .to("n18Mrmav6WpiL7thrfFDany6cMVDEkXsAA", 5000)
  .change("mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD")
  .sign(privateKey);

console.log(tx.toObject());
tx.serialize();

console.log(tx.serialize());

// push rawtransaction:
