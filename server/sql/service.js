const db = require("./db");

async function getResult() {
  const rows = await db.query(`SELECT * FROM joehocom_21010627g.Users`);

  return { rows };
}

module.exports = {
  getResult,
};
