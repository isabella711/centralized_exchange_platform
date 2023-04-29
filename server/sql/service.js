const db = require("./db");
var crypto = require("crypto");
const createMultiWallet = require("../walletGenerater/multiGen");

var generate_key = function () {
  // 16 bytes is likely to be more than enough,
  // but you may tweak it to your needs
  return crypto.randomBytes(16).toString("base64");
};

async function getResult() {
  const rows = await db.query(`SELECT * FROM joehocom_21010627g.Users`);

  return { rows };
}

async function getUser(id) {
  const rows = await db.query(
    `SELECT user_id, user_name, user_balance, email_address FROM joehocom_21010627g.Users WHERE user_id=${id}`
  );
}

async function getUserWalletByUser(id) {
  const wallet = await db.query(
    `SELECT wallet_id , currency_type, wallet_address, classicAddress FROM joehocom_21010627g.Wallets WHERE user_id=${id}`
  );
  return wallet;
}

async function login(email, password) {
  const query = await db.query(
    `SELECT * FROM joehocom_21010627g.Users WHERE email_address = ? AND password = ?`,
    [email, password]
  );
  let userId =
    query.find((col) => col.email_address === email)?.user_id ?? undefined;
  if (!userId) {
    return { msg: "Invalid credentials" };
  }
  let key = email + password + Date.now().toString();
  const sessionId = generate_key(key);

  if (query) {
    await db.query(
      `UPDATE joehocom_21010627g.Users SET session = ? WHERE user_id = ?`,
      [sessionId, userId]
    );
  }

  const result = await db.query(
    `SELECT user_id, user_name, user_balance, email_address, session FROM joehocom_21010627g.Users WHERE email_address = ? AND session = ?`,
    [email, sessionId]
  );

  return result;
}

async function register(email, password, name) {
  const query = await db.query(
    `SELECT * FROM joehocom_21010627g.Users WHERE email_address = ?`,
    [email]
  );
  let userId =
    query.find((col) => col.email_address === email)?.user_id ?? null;
  if (userId) {
    console.log("account already exist");
    return { msg: "account already exist" };
  }
  let key = email + password + Date.now().toString();
  const sessionId = generate_key(key);
  console.log([email, password, name, sessionId]);
  // if(!userId){
  await db.query(
    `INSERT INTO joehocom_21010627g.Users (email_address, password, user_name, session) VALUES (?, ?, ?, ?)`,
    [email, password, name, sessionId]
  );

  const result = await db.query(
    `SELECT user_id, user_name, user_balance, email_address, session FROM joehocom_21010627g.Users WHERE email_address = ? AND session = ?`,
    [email, sessionId]
  );
  const createdUserId = result.find(
    (col) => col.email_address === email
  )?.user_id;
  if (email && password && sessionId) {
    const wallets = await createMultiWallet();
    const { solAccount, ethAccount, xrpAccount, btcAccount } = wallets;
    console.log(`wallets.>>>`, {
      solAccount,
      ethAccount,
      xrpAccount,
      btcAccount,
    });
    if (solAccount && ethAccount && xrpAccount && btcAccount) {
      console.log(
        createdUserId,
        "BTC",
        Date.now().toString(),
        btcAccount.publicKey.toString(),
        btcAccount.privateKey.toString()
      );
      await db.query(
        `INSERT INTO joehocom_21010627g.Wallets (user_id, currency_type, wallet_create_date,wallet_address, wallet_private_key) VALUES  (?,?,?,?,?)`,
        [
          createdUserId,
          "BTC",
          Date.now().toString(),
          btcAccount.publicKey.toString(),
          btcAccount.privateKey.toString(),
        ]
      );
      await db.query(
        `INSERT INTO joehocom_21010627g.Wallets (user_id, currency_type, wallet_create_date,wallet_address, wallet_private_key) VALUES  (?,?,?,?,?)`,
        [
          createdUserId,
          "SOL",
          Date.now().toString(),
          solAccount.publicKey.toString(),
          solAccount.privateKey.toString(),
        ]
      );
      await db.query(
        `INSERT INTO joehocom_21010627g.Wallets (user_id, currency_type, wallet_create_date ,wallet_address, wallet_private_key) VALUES  (?,?,?,?,?)`,
        [
          createdUserId,
          "ETH",
          Date.now().toString(),
          ethAccount.address,
          ethAccount.privateKey,
        ]
      );
      await db.query(
        `INSERT INTO joehocom_21010627g.Wallets (user_id, currency_type,wallet_create_date , wallet_address, wallet_private_key, classicAddress, seed) VALUES  (?,?,?,?,?,?,?)`,
        [
          createdUserId,
          "XRP",
          Date.now().toString(),
          xrpAccount.publicKey,
          xrpAccount.privateKey,
          xrpAccount.classicAddress,
          xrpAccount.seed,
        ]
      );
    }
  }
  return result;
}

async function addValue(value) {
  if (value < 0) {
    return;
  }
  const rows = await db.query(
    `UPDATE users SET balance = balance + ? WHERE email = ?`,
    [value]
  );
}

async function createTransaction(content) {
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
      transactioner_B_currency_amount ) VALUES 
    (?,?,?,?,?,?,?,?)`,
    [
      content.transactioner_id_A,
      content.transaction_date,
      content.status,
      content.transactioner_id_B,
      content.transactioner_A_currency_type,
      content.transactioner_A_currency_amount,
      content.transactioner_B_currency_type,
      content.transactioner_B_currency_amount,
    ]
  );
  return result;
}

async function getAllTransaction() {
  const rows = await db.query(`SELECT * FROM joehocom_21010627g.Transactions`);
  console.log(`rows>>>rows`, rows);
}

async function getUserTransaction(id) {
  const rows = await db.query(
    `SELECT * FROM joehocom_21010627g.Transactions WHERE transactioner_id_A = ${id} OR transactioner_id_B = ${id}`
  );
  console.log(`rows>>>rows`, rows);
}
async function addCol() {
  const rows = await db.query(
    `ALTER TABLE joehocom_21010627g.Transactions ADD tx_id varchar(255)`
  );
  console.log(`rows>>>rows`, rows);
}

async function makeAutoIncre(start) {
  const rows = await db.query(
    `ALTER TABLE joehocom_21010627g.Transactions MODIFY transaction_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    [start]
  );
  console.log(`rows>>>rows`, rows);
}

// getAllTransaction();
// getUserTransaction(44);

// makeAutoIncre(2);

module.exports = {
  getResult,
  createTransaction,
  getUser,
  register,
  getUserWalletByUser,
  login,
};
