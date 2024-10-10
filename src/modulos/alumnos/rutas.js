const express = require("express");
const respuesta = require("../../red/respuestas.js");
const controlador = require("./index.js");
const router = express.Router();
const path = require("path");

router.get("/", todos);
router.get("/:id", uno);
router.put("/", eliminar);
router.post("/", agregar);
router.get("/tesis/:idAlumno", getTesis)
router.post("/comentarios", agregarComentario);
router.post("/peticion", peticion);

async function todos(req, res) {
  try {
    const items = await controlador.todos();
    respuesta.sucess(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function uno(req, res) {
  try {
    const items = await controlador.uno(req.params.id);
    respuesta.sucess(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function getTesis(req, res) {
  try {
    const items = await controlador.getTesis(req.params.idAlumno);
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

async function agregarComentario(req, res) {
  try {
    const comentario = await controlador.agregarComentario(req.body);
    console.log(comentario);
    respuesta.sucess(req, res, comentario, 201);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function peticion(req, res) {
  try {
    const items = await controlador.peticion(req.body);
  } catch (err) {
    console.log(err);
  }
}
module.exports = router;
