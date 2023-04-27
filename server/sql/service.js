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
  let userId = query.find((col) => col.email_address === email).user_id;
  let key = email + password + Date.now().toString();
  const sessionId = generate_key(key);

  if (query) {
    await db.query(
      `UPDATE joehocom_21010627g.Users SET session = ? WHERE user_id = ?`,
      [sessionId, userId]
    );
  }

  const result = await db.query(
    `SELECT * FROM joehocom_21010627g.Users WHERE email_address = ? AND session = ?`,
    [email, sessionId]
  );

  return result;
}

async function register(email, password) {
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
  console.log([email, password, sessionId]);
  // if(!userId){
  await db.query(
    `INSERT INTO joehocom_21010627g.Users (email_address, password, session) VALUES (?, ?, ?)`,
    [email, password, sessionId]
  );

  const result = await db.query(
    `SELECT * FROM joehocom_21010627g.Users WHERE email_address = ? AND session = ?`,
    [email, sessionId]
  );
  const createdUserId = result.find(
    (col) => col.email_address === email
  )?.user_id;
  if (email && password && sessionId) {
    const wallets = await createMultiWallet();
    const { solAccount, ethAccount, xrpAccount } = wallets;
    console.log(`wallets.>>>`, { solAccount, ethAccount, xrpAccount });
    if (solAccount && ethAccount && xrpAccount) {
      console.log(
        createdUserId,
        "XRP",
        Date.now().toString(),
        solAccount.publicKey.toString(),
        solAccount.privateKey.toString()
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
    `INSERT INTO programming_languages 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    (${content.name}, ${content.released_year}, ${content.githut_rank}, ${content.pypl_rank}, ${content.tiobe_rank})`
  );
  let message = "Error in creating programming language";
  if (result.affectedRows) {
    message = "Programming language created successfully";
  }
  return { message };
}
module.exports = {
  getResult,
  createTransaction,
  getUser,
  register,
  getUserWalletByUser,
  login,
};
