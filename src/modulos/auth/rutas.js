const express = require("express");
const controlador = require("./index.js");
const router = express.Router();

router.post("/", login);

async function login(req, res) {
  try {
    const { numero_de_cuenta, password } = req.body; // Cambia a req.body
    const token = await controlador.login(numero_de_cuenta, password);
    if (token) {
      res.redirect("/PaginaP");
    } else {
      res.redirect("/?error=Credenciales%20incorrectas"); // Agregar mensaje de error
    }
  } catch (err) {
    res.redirect("/?error=Error%20en%20el%20servidor");
  }
}

module.exports = router;
