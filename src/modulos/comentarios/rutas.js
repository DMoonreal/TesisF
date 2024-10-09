const express = require("express");
const respuesta = require("../../red/respuestas.js");
const controlador = require("./index.js");
const router = express.Router();
const path = require("path");

router.get("/:alumno_numero_cuenta", comentarios);
router.put("/", eliminar);
router.post("/", agregar);

async function comentarios(req, res) {
  try {
    const items = await controlador.comentarios(
      req.params.alumno_numero_cuenta
    );
    respuesta.sucess(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function todos(req, res) {
  try {
    const items = await controlador.todos();
    respuesta.sucess(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}
async function eliminar(req, res) {
  try {
    const items = await controlador.eliminar(req.body);
    respuesta.sucess(req, res, "Eliminacion correctas", 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function agregar(req, res) {
  try {
    const items = await controlador.agregar(req.body);
    console.log(items);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

module.exports = router;
