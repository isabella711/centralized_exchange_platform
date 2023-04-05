const mysql = require("mysql2");

async function query(sql) {
  const connection = await mysql.createConnection({
    host: "185.27.133.16",
    user: "joehocom_root",
    password: "Pass1234",
  });
  const results = await connection.execute(sql);
  return results;
}
module.exports = {
  query,
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
