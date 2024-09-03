const { error } = require("../../red/respuestas");
const bcrypt = require("bcrypt");

const TABLA = "auth";

module.exports = function (dbinyectada) {
  let db = dbinyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }

  async function login(numero_de_cuenta, password) {
    // Realiza la consulta para encontrar al usuario por su número de cuenta
    const data = await db.query(
      "SELECT * FROM auth WHERE numero_de_cuenta = ?",
      [numero_de_cuenta]
    );
    // Verifica que la consulta haya encontrado algún registro
    console.log("Resultado de la consulta:", data);
    if (data) {
      const user = data[0];
      console.log(user.password);
      console.log(password);
      // Compara la contraseña proporcionada con la almacenada en la base de datos
      if (password == user.password) {
        return true; // Retorna true si la contraseña es válida
      }
    }
    // Lanza un error si las credenciales no son correctas
    throw new Error("Credenciales incorrectas");
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
