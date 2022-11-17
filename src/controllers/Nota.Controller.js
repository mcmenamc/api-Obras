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
