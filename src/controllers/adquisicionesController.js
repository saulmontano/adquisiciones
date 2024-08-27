const { Adquisicion, Historial } = require("../models/adquisicionesModel");

exports.createAdquisicion = async (req, res) => {
  try {
    const {
      presupuesto,
      unidad,
      tipo,
      cantidad,
      valorUnitario,
      valorTotal,
      fecha,
      proveedor,
      documentacion,
    } = req.body;

    const newAdquisicion = await Adquisicion.create({
      presupuesto,
      unidad,
      tipo,
      cantidad,
      valorUnitario,
      valorTotal,
      fecha,
      proveedor,
      documentacion,
    });

    await Historial.create({
      adquisicionId: newAdquisicion.id,
      cambio: {
        antes: null,
        despues: newAdquisicion.toJSON(),
      },
      fecha: new Date(),
      tipoCambio: "creación",
    });

    res.status(201).json(newAdquisicion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAdquisiciones = async (req, res) => {
  try {
    const adquisiciones = await Adquisicion.findAll();
    res.status(200).json(adquisiciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdquisicionById = async (req, res) => {
  try {
    const id = req.params.id;
    const adquisicion = await Adquisicion.findByPk(id);
    if (adquisicion) {
      res.status(200).json(adquisicion);
    } else {
      res.status(404).json({ error: "Adquisición no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdquisicion = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const adquisicion = await Adquisicion.findByPk(id);
    if (adquisicion) {
      const oldData = adquisicion.toJSON();
      await Adquisicion.update(updatedData, { where: { id } });
      await Historial.create({
        adquisicionId: id,
        cambio: {
          antes: oldData,
          despues: updatedData,
        },
        fecha: new Date(),
        tipoCambio: "actualización",
      });
      const updatedAdquisicion = await Adquisicion.findByPk(id);
      res.status(200).json(updatedAdquisicion);
    } else {
      res.status(404).json({ error: "Adquisición no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdquisicion = async (req, res) => {
  try {
    const id = req.params.id;
    const adquisicion = await Adquisicion.findByPk(id);
    if (adquisicion) {
      await Adquisicion.destroy({ where: { id } });
      await Historial.create({
        adquisicionId: id,
        cambio: {
          antes: adquisicion.toJSON(),
          despues: null,
        },
        fecha: new Date(),
        tipoCambio: "eliminación",
      });
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Adquisición no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ------------------------
exports.getHistorialByAdquisicionId = async (req, res) => {
  try {
    const id = req.params.id;
    const historial = await Historial.findAll({ where: { adquisicionId: id } });
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
