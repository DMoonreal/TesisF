let TABLA = "alumnos";
const auth = require("../auth");

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

  return {
    todos,
    uno,
    eliminar,
    agregar,
  };
};
