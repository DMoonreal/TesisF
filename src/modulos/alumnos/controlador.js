const { token } = require("morgan");
const { error } = require("../../red/respuestas");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let TABLA = "alumnos";
const TABLA_COMENTARIOS = 'comentarios';

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

  //La intencion de esta funcion es trar todas las peticiones de revision del alumno seleccionado,
  //Estas basandose en el numero de cuenta del alumno y la tabla relacional Alumno_Tesis
  async function getTesis(idAlumno) {
    const numero_cuenta = parseInt(idAlumno);
    console.log("Entrando a la función getTesis", numero_cuenta);
    
    try {
        // Realiza la consulta a la base de datos
        const results = await db.query( 
            `SELECT t.* 
            FROM tesis t 
            JOIN alumnos_tesis at ON t.id = at.tesis_id 
            WHERE at.alumno_numero_cuenta = ?`,
            [numero_cuenta]
        );

        // Verificar si se encontraron resultados
        if (results.length === 0) {
            console.log("No se encontraron tesis para el número de cuenta:", numero_cuenta);
            return []; // Devuelve un array vacío si no se encuentran tesis
        }

        console.log("Tesis encontradas:", results);
        return results; // Devuelve los resultados de la consulta
    } catch (error) {
        console.error("Error en la consulta SQL:", error);
        throw new Error("Error al obtener las tesis: " + error.message);
    }
}
//Funcion para agregar comentarios
async function agregarComentario(comentarioData) {
  console.log("Entre a la funcion agregarComentario", comentarioData);
  return db.agregar(TABLA_COMENTARIOS, comentarioData);
}


  async function peticion(body) {
    return await db.query(`INSERT INTO alumnos_tesis SET ?`, [body]);
  }
  return {
    todos,
    uno,
    eliminar,
    agregar,
    getTesis,
    agregarComentario,
    peticion,
  };
};
