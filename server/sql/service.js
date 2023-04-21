const db = require("./db");

async function getResult() {
  const rows = await db.query(`SELECT * FROM joehocom_21010627g.Users`);

  return { rows };
}

async function create(content) {
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
  create,
};
