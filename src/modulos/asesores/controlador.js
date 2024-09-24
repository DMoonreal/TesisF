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
    let usuario;
    if (body.rol == "alumno") {
      usuario = {
        numero_cuenta: body.numero_cuenta,
        nombre: body.nombre,
        contrasena: body.contrasena,
        asesor_numero_cuenta: body.asesor,
      };
      TABLA = "alumnos";
    } else if (body.rol == "asesor") {
      console.log("entre asesor");
      TABLA = "asesores";
      usuario = {
        numero_cuenta: body.numero_cuenta,
        nombre: body.nombre,
        contrasena: body.contrasena,
      };
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
