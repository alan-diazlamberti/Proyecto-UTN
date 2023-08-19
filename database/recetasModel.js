var pool = require("./database");

// Funcion para obtener 9 receetas
async function getAllRecetas() {
  var query = "select * from recetas";
  var rows = await pool.query(query);
  return rows;
}

async function getRecetasPage1() {
  var query = "select * from recetas where ID <= 9";
  var rows = await pool.query(query);
  return rows;
}

async function getRecetasPage2() {
  var query = "select * from recetas where ID > 9";
  var rows = await pool.query(query);
  return rows;
}

// Funcion para obtener una receta por ID
async function getRecetaByID(ID) {
  var query = "select * from recetas where ID = ?";
  var row = await pool.query(query, [ID]);
  return row[0];
}

// Funciones para obtener 3 recetas
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

async function getRecetasCol5() {
  var query = "select * from recetas where ID > 13";
  var rows = await pool.query(query);
  return rows;
}

// Funcion para crear una nueva receta
async function addReceta(obj) {
  try {
    var query = "insert into recetas set ?";
    var row = await pool.query(query, [obj]);
    return row;
  } catch (error) {
    throw error;
  }
}

// Funcion para editar una receta
async function editRecetaByID(obj, ID) {
  try {
    var query = "update recetas set ? where ID = ?";
    var row = await pool.query(query, [obj, ID]);
    return row;
  } catch (error) {
    throw error;
  }
}

// Funcion para eliminar una receta
async function deleteRecetaByID(ID) {
  var query = "delete from recetas where ID = ?";
  var rows = await pool.query(query, [ID]);
  return rows;
}

// Funcion para buscar una receta
async function searchReceta(search) {
  var query =
    "select * from recetas where titulo like ? or ingredientes like ? order by ID asc";
  var rows = await pool.query(query, ["%" + search + "%", "%" + search + "%"]);
  return rows;
}

module.exports = {
  getAllRecetas,
  getRecetasPage1,
  getRecetasPage2,
  getRecetaByID,
  deleteRecetaByID,
  getRecetasCol1,
  getRecetasCol2,
  getRecetasCol3,
  getRecetasCol4,
  getRecetasCol5,
  addReceta,
  editRecetaByID,
  searchReceta,
};
