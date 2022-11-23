import NotaModel from '../models/Nota.js';

export const getNotas = async (req, res) => {
  try {
    const notas = await NotaModel.find();
    res.status(200).json(notas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getNota = async (req, res) => {
  const { id } = req.params;

  try {
    const nota = await NotaModel.findById(id);

    res.status(200).json(nota);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNota = async (req, res) => {
  try {
    const { Fecha, Extra } = req.body;
    if (!Fecha || !Extra) {
      console.log('Error: ', req.body);
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const newNota = {
      Fecha,
      Extra
    };

    const createdNota = await NotaModel.create(newNota);

    res.status(201).json(createdNota);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
