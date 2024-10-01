const express = require("express");
const controlador = require("./index.js");
const router = express.Router();

router.post("/", login);

async function login(req, res) {
  try {
    const { numero_cuenta, contrasena, rol } = req.body;
    const token = await controlador.login(numero_cuenta, contrasena, rol);

    if (token) {
      console.log("Mande el Token", token);
      return res.status(200).json({ token }); // Devuelve el token en la respuesta JSON
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = router;
