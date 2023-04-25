// const bitcore = require('bitcore-lib')
// const privateKey = new bitcore.PrivateKey('testnet');

// console.log(privateKey)


const bitcore = require('bitcore-lib');
// const Insight = require('bitcore-insight').Insight;

// let insight = new Insight('testnet');

let value = Buffer.from('cat horse shoe lightning awesome bitcoin');
let hash = bitcore.crypto.Hash.sha256(value);
let bn = bitcore.crypto.BN.fromBuffer(hash);

const privateKey = new bitcore.PrivateKey(bn,'testnet');

console.log(privateKey,privateKey.toAddress().toString())
