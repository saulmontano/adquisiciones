const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adquisicionesRoutes = require("./src/routes/adquisicionesRoutes");

const app = express();
const port = 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar el motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Usar las rutas de adquisiciones
app.use("/adquisiciones", adquisicionesRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.render("index");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
