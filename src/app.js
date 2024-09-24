//Las Constantes
const express = require("express");
const morgan = require("morgan");
const config = require("./config.js");
const app = express();
const asesores = require("./modulos/asesores/rutas.js");
const tesis = require("./modulos/tesis/rutas.js");
const alumnos = require("./modulos/alumnos/rutas.js");
const login = require("./modulos/auth/rutas.js");
const path = require("path");

//Configuracion
app.set("port", config.app.port);

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Rutas
app.use("/", express.static(__dirname + "/public"));
app.use("/PagAsesores", express.static(__dirname + "/public/PagAsesores.html"));
app.use(
  "/PagEstudiante",
  express.static(__dirname + "/public/PagEstudiante.html")
);
app.use("/api/asesores", asesores);
app.use("/api/tesis", tesis);
app.use("/api/alumnos", alumnos);
app.use("/login", login);

module.exports = app;
