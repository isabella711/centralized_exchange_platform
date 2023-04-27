const mysql = require("mysql2/promise");

const config = {
  host: "185.27.133.16",
  user: "joehocom_root",
  password: "Pass1234",
};

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.execute(sql, params);
  return results;
}

async function queryBulk(sql, params, isBulk) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.query(sql, params, isBulk);
  return results;
}

async function getTables() {
  const connection = await mysql.createConnection(config);

  const [results] = await connection.execute(
    `SELECT *
    FROM information_schema.tables
    WHERE table_type='BASE TABLE'
          AND table_schema = 'joehocom_21010627g' `
  );
  return results;
}

// async function addColumn() {
//   const connection = await mysql.createConnection(config);
//   const [results] = await connection.execute(
//     `ALTER TABLE joehocom_21010627g.Wallets ADD seed varchar(255)`
//   );
//   console.log(`results>>`, results);
//   return results;
// }

// getTable().then((res) => {
//   console.log(`getTable>>>`, res);
// });

// addColumn();

module.exports = {
  query,
  queryBulk,
};

// const user_id = () => {
//   let id = "1";
//   if (user_id) {
//     return Number(id);
//   }
//   return null;
// };
// const sql = `SELECT * FROM joehocom_21010627g.Users WHERE user_id = ${user_id()}`;

// const sqlInsert = `INSERT INTO joehocom_21010627g.Transactions (transaction_id, transactioner_id_A, transaction_date, status, transactioner_id_B,transactioner_A_currency_type, transactioner_A_currency_amount, transactioner_B_currency_type,transactioner_B_currency_amount)
// VALUES ('1','2', CURRENT_TIMESTAMP,'Success','0','USD','2000','USD','2000');`;

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query(sqlInsert, function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + JSON.stringify(result));
//     return JSON.stringify(result);
//   });
// });
