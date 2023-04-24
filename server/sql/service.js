const db = require("./db");
var crypto = require("crypto");

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
    `SELECT * FROM joehocom_21010627g.Users WHERE user_id=${id}`
  );

  return { rows };
}

async function login(email, password) {
  const query = await db.query(
    `SELECT * FROM users WHERE email = ${email} AND password = ${password}`
  );
  const sessionId = generate_key();

  const insert = await db.query();

  return { query };
}

async function register(email, password) {
  const query = await db.query(
    `INSERT INTO joehocom_21010627g.Users (email, password) VALUES (${email}, ${password})`
  );
  return { query };
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
  login,
};
