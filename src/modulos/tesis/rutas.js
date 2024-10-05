const express = require("express");
const respuesta = require("../../red/respuestas.js");
const controlador = require("./index.js");
const router = express.Router();
const multer = require("multer");

// Configuración de multer para guardar los archivos en la carpeta 'documents'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/Documents");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Middleware de multer para manejar la subida de archivos
const upload = multer({ storage: storage });

// Definir las rutas
router.get("/", todos);
router.get("/:id", uno);
router.put("/", eliminar);
router.post("/", agregar);

// Ruta para subir archivos
router.post("/upload", upload.single("pdf"), uploadFile); // Usamos el middleware upload aquí

// Funciones
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
    respuesta.sucess(req, res, "Eliminación correcta", 200);
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
      respuesta.sucess(req, res, { mensaje, insertId: items.insertId }, 201);
    }
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

// Función para manejar la subida del archivo
async function uploadFile(req, res) {
  if (!req.file) {
    return respuesta.error(req, res, "No se subió ningún archivo", 400);
  }

  // Si el archivo se sube correctamente
  return respuesta.sucess(req, res, "Archivo subido con éxito", 200);
}

module.exports = router;
