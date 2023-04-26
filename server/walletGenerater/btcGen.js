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


const createbitcoinAccount = async () => {
  let value = Buffer.from('cat horse shoe lightning awesome bitcoin');
  let hash = bitcore.crypto.Hash.sha256(value);
  let bn = bitcore.crypto.BN.fromBuffer(hash);
  const privateKey = new bitcore.PrivateKey(bn,'testnet');
  console.log(privateKey,privateKey.toAddress().toString())
  return [privateKey,privateKey.toAddress().toString()];}





//Method 2
const axios = require('axios');

//
const createbitcoinAccountAPI = async () => {
    try {
      const call = await axios.post("https://api.blockcypher.com/v1/btc/test3/wallets?token=d918fe8c97a348e39abdb9e5ff48543d");
      return call.address;
    } catch (error) {
      console.log("Error", error);
    }};
module.exports = { createbitcoinAccount,createbitcoinAccountAPI };
