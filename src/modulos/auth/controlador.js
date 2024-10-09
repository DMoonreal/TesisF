const { token } = require("morgan");
const { error } = require("../../red/respuestas");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let TABLA = "asesores";

module.exports = function (dbinyectada) {
  let db = dbinyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }

  async function login(numero_de_cuenta, password, rol) {
    numero_de_cuenta = parseInt(numero_de_cuenta);
    // Realiza la consulta para encontrar al usuario por su número de cuenta
    if (rol == "alumno") {
      TABLA = "alumnos";
    } else if (rol == "asesor") {
      TABLA = "asesores";
    }
    const data = await db.query(
      `SELECT * FROM ${TABLA} WHERE numero_cuenta = ?`,
      [numero_de_cuenta]
    );
    if (data) {
      const user = data[0];
      // Compara la contraseña proporcionada con la almacenada en la base de datos
      if (password == user.contrasena) {
        const perfil = {
          nombre: user.nombre,
          numero_cuenta: user.numero_cuenta,
        };
        if (rol == "alumno") {
          perfil.asesor_numero_cuenta = user.asesor_numero_cuenta;
        }
        const accessToken = generateAccessToken(perfil);
        return accessToken; // Retorna true si la contraseña es válida
      }
    } else {
      return 0;
    }
    // Lanza un error si las credenciales no son correctas
  }
  async function generateAccessToken(perfil) {
    return jwt.sign(perfil, process.env.SECRET, { expiresIn: "1m" });
  }

  async function agregar(data) {
    const authData = {
      id: data.id,
    };
    if (data.numero_de_cuenta) {
      authData.numero_de_cuenta = data.numero_de_cuenta;
    }
    if (data.password) {
      authData.password = data.password;
    }
    return db.agregar(TABLA, authData);
  }

  return {
    agregar,
    login,
  };
};