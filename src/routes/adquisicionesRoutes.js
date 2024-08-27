const express = require("express");
const router = express.Router();
const adquisicionesController = require("../controllers/adquisicionesController");

// Ruta para obtener todas las adquisiciones
router.get("/", adquisicionesController.getAllAdquisiciones);

// Ruta para obtener  por ID
router.get("/:id", adquisicionesController.getAdquisicionById);

// Ruta para crear una nueva adquisición
router.post("/", adquisicionesController.createAdquisicion);

// Ruta para actualizar una adquisición por ID
router.put("/:id", adquisicionesController.updateAdquisicion);

// Ruta para eliminar una adquisición por ID
router.delete("/:id", adquisicionesController.deleteAdquisicion);

// Ruta para obtener el historial de una adquisición por ID
router.get(
  "/:id/historial",
  adquisicionesController.getHistorialByAdquisicionId
);

module.exports = router;
