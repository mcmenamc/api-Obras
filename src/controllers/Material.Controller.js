import MaterialModel from '../models/Material.js';

export const getMaterials = async (req, res) => {
  try {
    const materials = await MaterialModel.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const material = await MaterialModel.findById(id);

    res.status(200).json(material);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMaterial = async (req, res) => {
  try {
    const { Nombre, Marca, Categoria, UnidadMedida } = req.body;
    if (!Nombre || !Marca || !Categoria || !UnidadMedida) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const newMaterial = {
      Nombre_Mat: Nombre,
      Marca,
      Categoria,
      UnidadMedida
    };
    const createdMaterial = await MaterialModel.create(newMaterial);

    res.status(201).json(createdMaterial);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
