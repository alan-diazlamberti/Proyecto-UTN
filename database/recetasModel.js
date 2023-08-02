var pool = require("./database");

async function getRecetas() {
  var query = "select * from recetas";
  var rows = await pool.query(query);
  return rows;
}

module.exports = { getRecetas };
