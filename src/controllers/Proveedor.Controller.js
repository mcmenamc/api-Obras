import ProveedorModel from '../models/Proveedor.js';
import exceljs from 'exceljs';
import { EstiloCelda, EstiloEncabezado } from '../utils/Excel.Style.js';

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

export const createProveedoresExcel = async (req, res) => {
  try {
    const proveedores = await ProveedorModel.find();
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Provedores');

    worksheet.mergeCells('A1:G1');
    worksheet.getCell('A1').value = 'Lista de Proveedores';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 100;

    // Encabezados
    worksheet.getCell('A2').value = 'Identificador';
    worksheet.getCell('B2').value = 'Razon Social';
    worksheet.getCell('C2').value = 'Agente';
    worksheet.getCell('D2').value = 'Direccion';
    worksheet.getCell('E2').value = 'Telefono';
    worksheet.getCell('F2').value = 'Correo';
    worksheet.getCell('G2').value = 'Tipo de Material';
    // Datos
    let row = 3;
    proveedores.forEach((prove) => {
      worksheet.getCell('A' + row).value = prove._id;
      worksheet.getCell('B' + row).value = prove.RazonSoc;
      worksheet.getCell('C' + row).value = prove.Agente;
      worksheet.getCell('D' + row).value = prove.Direccion;
      worksheet.getCell('E' + row).value = prove.Telefono;
      worksheet.getCell('F' + row).value = prove.Correo;
      worksheet.getCell('G' + row).value = prove.TipoMaterial;
      row++;
    });

    // Estilos
    worksheet.getRow(2).eachCell((cell) => {
      cell.fill = EstiloEncabezado.fill;
      cell.font = EstiloEncabezado.font;
      cell.alignmente = EstiloEncabezado.alignment;
      cell.border = EstiloEncabezado.border;
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = EstiloCelda.font;
        cell.alignment = EstiloCelda.alignment;
        cell.border = EstiloCelda.border;
      });
    });

    // for  de letras
    const letras = 'ABCDEFG';
    for (let i = 0; i < letras.length; i++) {
      worksheet.getColumn(letras[i]).width = 50;
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=DetalleNotas.xlsx');

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
