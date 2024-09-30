const mysql = require("mysql");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let conexion;
function conMysql() {
  conexion = mysql.createConnection(dbconfig);
  conexion.connect((err) => {
    if (err) {
      console.log(err);
    } else console.log("Base de datos conectada");
  });
}

conMysql();
function todos(tabla) {
  return new Promise((res, req) => {
    conexion.query(`SELECT * FROM ${tabla}`, (err, resultado) => {
      if (err) {
        return req(err);
      } else res(resultado);
    });
  });
}
function uno(tabla, id) {
  console.log("Entre a la funcion uno", id);
  return new Promise((res, req) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE asesor_numero_cuenta = ?`, // Asegúrate de que `numero_cuenta` sea el campo correcto
      [id], // Usa el id como parámetro seguro
      (err, resultado) => {
        if (err) {
          console.log("Error en la consulta SQL:", err); // Añadir logs para más información
          return req(err);
        } else if (resultado.length === 0) {
          console.log("No se encontraron resultados"); // Indicar si no se encuentra nada
          return req(new Error("No se encontraron resultados"));
        } else {
          res(resultado); // Devolver los resultados de la consulta
        }
      }
    );
  });
}
function query(sql, params = []) {
  console.log(sql, params);
  return new Promise((resolve, reject) => {
    conexion.query(sql, params, (err, resultado) => {
      if (err) {
        reject(err);
      } else {
        resolve(resultado);
        return "Todo bien";
      }
    });
  });
}
function agregar(tabla, data) {
  console.log(tabla);
  return new Promise((res, req) => {
    conexion.query(
      `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, resultado) => {
        if (err) {
          console.log(err);
          return req(err);
        } else res(resultado);
      }
    );
  });
}
function eliminar(tabla, data) {
  return new Promise((res, req) => {
    conexion.query(
      `DELETE FROM ${tabla} WHERE id=?`,
      [data.id],
      (err, resultado) => {
        if (err) {
          return req(err);
        } else res(resultado);
      }
    );
  });
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
  query,
};
