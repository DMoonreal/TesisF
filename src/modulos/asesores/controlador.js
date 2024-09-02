const TABLA = "asesores";
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
    const usuario = {
      id: body.id,
      nombre: body.nombre,
    };
    const respuesta = await db.agregar(TABLA, usuario);
    var insertId = 0;
    if (body.id == 0) {
      insertId = respuesta.insertId;
    } else {
      insertId = body.id;
    }
    console.log(body.numero_de_cuenta);
    if (body.numero_de_cuenta || body.password) {
      await auth.agregar({
        id: insertId,
        numero_de_cuenta: body.numero_de_cuenta,
        password: body.password,
      });
    }
    return true;
  }

  return {
    todos,
    uno,
    eliminar,
    agregar,
  };
};
