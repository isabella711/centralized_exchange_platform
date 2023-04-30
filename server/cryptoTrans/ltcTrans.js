// load this library
const BlockIo = require('block_io');

// instantiate a client
const apiKey = "578f-0868-73d8-7aba";
const secretPIN = "Roc19111010Prc19491001";
const block_io = new BlockIo(apiKey);
const centralAddress = "Qa3HpkiD8n9JGFGauFx6aZWNPepD2gkTE8";

async function buyLitecoin(toAddress, sendamount) {
	sendLitecoinTransaction(centralAddress,toAddress, sendamount);
}

async function sellLitecoin(sellAddress, sendamount) {
	sendLitecoinTransaction(sellAddress, centralAddress, sendamount);
}

async function sendLitecoinTransaction(fromAddress, toAddress, sendamount) {
  try {
    // print the account balance
    let balance = await block_io.get_balance();
    console.log(JSON.stringify(balance,null,2));

    // print first page of unarchived addresses on this account
    let addresses = await block_io.get_my_addresses();
    console.log(JSON.stringify(addresses,null,2));

    // withdrawal:
    //   prepare_transaction ->
    //   summarize_prepared_transaction ->
    //   create_and_sign_transaction ->
    //   submit_transaction
    let prepared_transaction = await block_io.prepare_transaction({
      from_addresses: fromAddress,
      to_addresses: toAddress,
      amount: sendamount.toString(),
    });

    // inspect the prepared data for yourself. here's a
    // summary of the transaction you will create and sign
    let summarized_transaction = await block_io.summarize_prepared_transaction({data: prepared_transaction});
    console.log(JSON.stringify(summarized_transaction,null,2));
    
    // create and sign this transaction:
    // we specify the PIN here to decrypt
    // the private key to sign the transaction
    let signed_transaction = await block_io.create_and_sign_transaction({data: prepared_transaction, pin: secretPIN});

    // inspect the signed transaction yourself
    // once satisfied, submit it to Block.io
    let result = await block_io.submit_transaction({transaction_data: signed_transaction});
    console.log(JSON.stringify(result,null,2)); // contains the transaction ID of the final transaction
    
  } catch (error) {
    console.log("Error:", error.message);
  }
}
/*
async function getLitecoinBalance(ltcaddress) {
  return new Promise((resolve, reject) => {
    block_io.get_balance({ address: ltcaddress }, function (error, response) {
      if (error) {
        console.log("Error:", error);
        reject(error);
      } else {
        let balval = response.data.available_balance;
        let network = response.data.network;
        //console.log("Balance:", balval, network);
        resolve(balval);
      }
    });
  });
} */

const getLitecoinBalance = async (ltcaddress) => {
  try{
	  const call = await block_io.get_balance({ address: ltcaddress });
	  const bal = call.data.available_balance;
	  // .then((balance) => {
	  //   console.log(`ethcall>>>`, balance);
	  //   return balance.result / 10e17;
	  // })
	  // .catch((err) => {
	  //   console.log(`err>>>eth`, err);
	  // });
	  return {
		 balance : bal,
		 message : "OK"
	  }
  } catch {
	  return {
		message : "Fail"
	  }
  }
};

module.exports = { buyLitecoin, sellLitecoin, sendLitecoinTransaction, getLitecoinBalance};