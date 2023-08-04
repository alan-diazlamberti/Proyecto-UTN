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

async function getRecetasCol1() {
  var query = "select * from recetas where ID between 1 and 3";
  var rows = await pool.query(query);
  return rows;
}

async function getRecetasCol2() {
  var query = "select * from recetas where ID between 4 and 6";
  var rows = await pool.query(query);
  return rows;
}

async function getRecetasCol3() {
  var query = "select * from recetas where ID between 7 and 9";
  var rows = await pool.query(query);
  return rows;
}

async function getRecetasCol4() {
  var query = "select * from recetas where ID between 10 and 12";
  var rows = await pool.query(query);
  return rows;
}

module.exports = {
  getAllRecetas,
  deleteRecetaByID,
  getRecetasCol1,
  getRecetasCol2,
  getRecetasCol3,
  getRecetasCol4,
};
