const express = require("express");
const respuesta = require("../../red/respuestas.js");
const controlador = require("./index.js");
const router = express.Router();

router.get("/", todos);
router.get("/:id", uno);
router.put("/", eliminar);
router.post("/", agregar);
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
    let mensaje;
    if (req.body.id == 0) {
      mensaje = "Tesis agregada con éxito";
      respuesta.sucess(req, res, { mensaje, insertId: items.insertId }, 201); // Devuelve también el insertId
    } else {
      mensaje = "Tesis actualizada";
      respuesta.sucess(req, res, { mensaje, insertId: items.insertId }, 201); // No hay insertId en actualización
    }
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}
module.exports = router;
