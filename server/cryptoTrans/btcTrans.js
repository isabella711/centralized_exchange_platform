// const Btc = require('bitcoinjs-lib')
// const TestNet = Btc.networks.testnet
// let keyPair = Btc.ECPair.makeRandom({ network: TestNet })
// let publicKey = keyPair.getAddress()
// let privateKey = keyPair.toWIF()
// console.log(`Public: ${publicKey} \n Private: ${privateKey}`)
// let privKey = privateKey
// let ourWallet = new Btc.ECPair.fromWIF(privKey, TestNet)
// console.log("ourWallet public key:", ourWallet.getAddress())


// const BigInteger = require('bigi')
// let passphrase = 'J@vaScr1pt'
// let keyPair = generateAddressFromSHA256Hash(passphrase);
// function generateAddressFromSHA256Hash(passphrase) {
//   let hash = Btc.crypto.sha256(passphrase);
//   let d = BigInteger.fromBuffer(hash);
//   let keyPair = new Btc.ECPair(d, null, { network: TestNet });
//   return keyPair;
// }
// console.log('keyPair public address: ', keyPair.getAddress())


// const bitcore = require('bitcore-lib')
// var explorers = require('bitcore-explorers').Insight;
// var insight = new explorers.Insight("https://explorer.btc.zelcore.io");
// // // // var privateKey = new bitcore.PrivateKey('testnet');
// // // // console.log(`privateKey>>>`,privateKey,'privateKey<<<',privateKey.toString()) 
// // // // var address = privateKey.toAddress(); 
// // // // console.log(`address>>`,address ,'address<<<',address.toString()) 

// insight.getUnspentUtxos('mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD', function(utxos, error) {
//     if (error) {
//     //   console.log(error);
//     } else {
//       console.log(utxos);
//       // transaction code goes here
//   }})


// var utxo = {
//     "txId" : "02a335bfe95c6dbe5aecaf5215a7d22d3195fbde6e12d4c81d367842ce8b5587",
//     "outputIndex" : 0,
//     "address" : "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD",
//     "script" : "76a9143f34f05440c780bec34c040d8f19f11e2722309a88ac",
//     "satoshis" : 10000
//   };
// const privateKey=  new bitcore.PrivateKey('fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa')

// const tx = bitcore.Transaction()
// tx.from(utxo).to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK',5000)
// .change('mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD')
// .sign(privateKey)

// console.log(tx.toObject())
// tx.serialize();

// console.log(tx)
// insight.broadcast(tx.serialize(),(err,returnedTxid)=>{
//     if(err){
//         console.log(`>>>err`,err)
//         // console.log(`err`)
//     }else{
//     console.log(returnedTxid)
// }
// })


var bitcoinTransaction = require('bitcoin-transaction');

//Send all my money from wallet1 to wallet2 on the bitcoin testnet
var from = "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD";
var to = "n18Mrmav6WpiL7thrfFDany6cMVDEkXsAA";
var privKeyWIF = "fd8063c335d80db72a4b99da0cb49ceda5021b5673c565bedad98fa6f57fb8aa";	//Private key in WIF form (Can generate this from bitcoinlib-js)

bitcoinTransaction.getBalance(from, { network: "testnet" }).then((balanceInBTC) => {
	return bitcoinTransaction.sendTransaction({
		from: from,
		to: to,
		privKeyWIF: privKeyWIF,
		btc: balanceInBTC,
		network: "testnet"
	});
});