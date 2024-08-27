const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Configurar Sequelize para usar SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../database.sqlite3"),
});

// Definir el modelo de Adquisición
const Adquisicion = sequelize.define("Adquisicion", {
  presupuesto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valorUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  valorTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  proveedor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documentacion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Definir el modelo de Historial
const Historial = sequelize.define("Historial", {
  adquisicionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Adquisicion,
      key: "id",
    },
  },
  cambio: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipoCambio: {
    type: DataTypes.STRING, // 'creación', 'actualización', 'eliminación'
    allowNull: false,
  },
});

// Definir relaciones
Adquisicion.hasMany(Historial, {
  foreignKey: "adquisicionId",
  onDelete: "CASCADE",
});
Historial.belongsTo(Adquisicion, { foreignKey: "adquisicionId" });

// Sincronizar modelos con la base de datos
(async () => {
  await sequelize.sync({ alter: true }); // Modifica las tablas si es necesario sin eliminar datos
})();

module.exports = { Adquisicion, Historial };
