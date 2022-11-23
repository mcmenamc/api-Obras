import ObraModel from '../models/Obra.js';

export const getObras = async (req, res) => {
  try {
    const obras = await ObraModel.find();

    res.status(200).json(obras);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getObra = async (req, res) => {
  const { id } = req.params;

  try {
    const obra = await ObraModel.findById(id);

    res.status(200).json(obra);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createObra = async (req, res) => {
  try {
    const { NombreObra, Direccion, FechaInicio, FechaFin, Dueno, Responsable, TelResp, CorreoResp } = req.body;

    if (!NombreObra || !Direccion || !FechaInicio || !FechaFin || !Dueno || !Responsable || !TelResp || !CorreoResp) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const newObra = {
      Nombre_Obra: NombreObra,
      Direccion,
      FechaInicio,
      FechaFin,
      Dueno,
      Responsable,
      Tel_resp: TelResp,
      Correo_resp: CorreoResp
    };
    console.log(newObra);

    const createdObra = await ObraModel.create(newObra);

    res.status(201).json(createdObra);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
