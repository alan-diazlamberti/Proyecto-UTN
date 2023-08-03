var pool = require("./database");

async function getAllRecetas() {
  var query = "select * from recetas";
  var rows = await pool.query(query);
  return rows;
}

async function deleteRecetaByID(ID) {
  var query = "delete from recetas where ID = ?";
  var rows = await pool.query(query, [ID]);
  return rows;
}

module.exports = { getAllRecetas, deleteRecetaByID };
