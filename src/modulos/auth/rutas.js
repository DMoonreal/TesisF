const express = require("express");
const controlador = require("./index.js");
const router = express.Router();

router.post("/", login);

async function login(req, res) {
  try {
    const { numero_cuenta, contrasena, rol } = req.body; // Cambia a req.body
    const token = await controlador.login(numero_cuenta, contrasena, rol);

    if (token) {
      if (rol == "alumno") {
        res.redirect("/PagEstudiante");
      } else res.redirect("/PagAsesores");
    } else {
      res.redirect("/?error=Credenciales%20incorrectas"); // Agregar mensaje de error
    }
  } catch (err) {
    res.redirect("/?error=Error%20en%20el%20servidor");
  }
}

module.exports = router;
