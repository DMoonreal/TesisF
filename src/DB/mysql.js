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
  return new Promise((res, req) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE id=${id}`,
      (err, resultado) => {
        if (err) {
          return req(err);
        } else res(resultado);
      }
    );
  });
}
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, params, (err, resultado) => {
      if (err) {
        reject(err);
      } else {
        resolve(resultado);
      }
    });
  });
}
function agregar(tabla, data) {
  return new Promise((res, req) => {
    conexion.query(
      `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, resultado) => {
        if (err) {
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
