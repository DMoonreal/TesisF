const db = require("../../DB/mysql");
const controlador = require("./controlador");

module.exports = controlador(db);
