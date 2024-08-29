//Las Constantes
const express = require("express");
const morgan = require("morgan");
const config = require("./config.js");
const app = express();
const asesores = require("./modulos/asesores/rutas.js");
const tesis = require("./modulos/tesis/rutas.js");
const path = require("path");

//Configuracion
app.set("port", config.app.port);

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Rutas
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});
app.use("/api/asesores", asesores);
app.use("/api/tesis", tesis);
module.exports = app;
