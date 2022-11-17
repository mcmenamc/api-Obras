import DetalleNotaModel from '../models/DetalleNota.js';

export const getDetalleNotas = async (req, res) => {
  try {
    const detalleNotas = await DetalleNotaModel.find();

    res.status(200).json(detalleNotas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDetalleNota = async (req, res) => {
  const { id } = req.params;

  try {
    const detalleNota = await DetalleNotaModel.findById(id);

    res.status(200).json(detalleNota);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDetalleNota = async (req, res) => {
  const detalleNota = req.body;

  const newDetalleNota = new DetalleNotaModel(detalleNota);

  try {
    await newDetalleNota.save();

    res.status(201).json(newDetalleNota);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
