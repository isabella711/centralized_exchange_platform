const request = require('request');

async function sendLitecoinTransaction(fromAddress, toAddress, amount) {
const apiKey = '578f-0868-73d8-7aba';

const url = `https://www.block.io/api/v2/prepare_transaction/?api_key=${apiKey}&from_addresses=${fromAddress}&to_addresses=${toAddress}&amounts=${amount}`;

request(url, (error, response, body) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Response:', JSON.parse(body));
  }
});
}

//getTransactionHistory(transactionId);
