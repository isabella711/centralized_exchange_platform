const db = require("./db");

async function createTransactionRecord(content) {
  // TODO: add transaction on testnet
  const result = await db.query(
    `INSERT INTO joehocom_21010627g.Transactions 
      ( transactioner_id_A, 
        transaction_date ,
        status ,
        transactioner_id_B,
        transactioner_A_currency_type,
        transactioner_A_currency_amount,
        transactioner_B_currency_type,
        transactioner_B_currency_amount, tx_id ) VALUES 
      (?,?,?,?,?,?,?,?,?)`,
    [
      content.transactioner_id_A,
      content.transaction_date,
      content.status,
      content.transactioner_id_B,
      content.transactioner_A_currency_type,
      content.transactioner_A_currency_amount,
      content.transactioner_B_currency_type,
      content.transactioner_B_currency_amount,
      content.tx_id,
    ]
  );
  return result;
}

module.exports = { createTransactionRecord };
