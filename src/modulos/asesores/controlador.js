let TABLA = "asesores";
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
    let usuario = {
      numero_cuenta: body.numero_cuenta,
      nombre: body.nombre,
      contrasena: body.contrasena,
    };
    if (body.rol == "alumno") {
      TABLA = "alumnos";
      usuario.asesor_numero_cuenta = body.asesor;
    } else if (body.rol == "asesor") {
      console.log("entre asesor");
      TABLA = "asesores";
    }
    return await db.agregar(TABLA, usuario);
  }

  return {
    todos,
    uno,
    eliminar,
    agregar,
  };
};
