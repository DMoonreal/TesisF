let TABLA = "comentarios";
const auth = require("../auth");

module.exports = function (dbinyectada) {
  let db = dbinyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }
  function todos() {
    return db.todos(TABLA);
  }
  async function comentarios(alumno_numero_cuenta) {
    console.log("HOLAA", alumno_numero_cuenta);

    const sql = "SELECT * FROM comentarios WHERE alumno_numero_cuenta = ?";
    return await db
      .query(sql, [alumno_numero_cuenta])
      .then((resultado) => {
        // Si no hay comentarios, puedes devolver un mensaje específico
        if (resultado.length === 0) {
          return 0;
        }
        return resultado; // Devuelve los comentarios si hay resultados
      })
      .catch((error) => {
        console.error("Error al obtener comentarios:", error);
        throw error; // Lanza el error para que se maneje en el lugar donde se llama
      });
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
    comentarios,
    eliminar,
    agregar,
  };
};
