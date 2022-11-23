import ProveedorModel from '../models/Proveedor.js';

export const GetProveedores = async (req, res) => {
  try {
    const proveedores = await ProveedorModel.find();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const GetProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await ProveedorModel.findById(id);
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const CreateProveedor = async (req, res) => {
  try {
    const { RazonSoc, Agente, Direccion, Telefono, Correo, TipoMaterial } = req.body;
    if (!RazonSoc || !Agente || !Direccion || !Telefono || !Correo || !TipoMaterial) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const newProveedor = {
      RazonSoc,
      Agente,
      Direccion,
      Telefono,
      Correo,
      TipoMaterial
    };

    const createdProveedor = await ProveedorModel.create(newProveedor);

    res.status(201).json(createdProveedor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
