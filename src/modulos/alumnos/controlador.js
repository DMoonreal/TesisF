let TABLA = "alumnos";

module.exports = function (dbinyectada) {
  let db = dbinyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }
  function todos() {
    return db.todos(TABLA);
  }

  function uno(id) {
    return db.uno(TABLA, id);
  }

  function eliminar(body) {
    return db.eliminar(TABLA, body);
  }

  async function agregar(body) {
    return db.agregar(TABLA, body);
  }
  async function peticion(body) {
    return await db.query(`INSERT INTO alumnos_tesis SET ?`, [body]);
  }
  return {
    todos,
    uno,
    eliminar,
    agregar,
    peticion,
  };
};
