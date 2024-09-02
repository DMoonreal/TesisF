const { error } = require("../../red/respuestas");
const bcrypt = require("bcrypt");

const TABLA = "auth";

module.exports = function (dbinyectada) {
  let db = dbinyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }

  async function login(numero_de_cuenta, password) {
    const data = await db.query(TABLA, { numero_de_cuenta: numero_de_cuenta });
    if (data && data.length > 0) {
      const user = data[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return true;
      }
    }
    // Si llega aquí, es porque las credenciales no son válidas
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
      authData.password = await bcrypt.hash(data.password, 10); // Hash de la contraseña
    }
    return db.agregar(TABLA, authData);
  }

  return {
    agregar,
    login,
  };
};
