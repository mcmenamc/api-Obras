import ObraModel from '../models/Obra.js';
import exceljs from 'exceljs';
import { EstiloCelda, EstiloEncabezado } from '../utils/Excel.Style.js';

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

export const createObrasExcel = async (req, res) => {
  try {
    const Obras = await ObraModel.find();
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Obras');

    worksheet.mergeCells('A1:I1');
    worksheet.getCell('A1').value = 'Lista de Obras';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 100;

    // Encabezados
    worksheet.getCell('A2').value = 'Identificador';
    worksheet.getCell('B2').value = 'Nombre_Obra';
    worksheet.getCell('C2').value = 'Direccion';
    worksheet.getCell('D2').value = 'Fecha Inicio';
    worksheet.getCell('E2').value = 'Fecha Fin';
    worksheet.getCell('F2').value = 'Dueño';
    worksheet.getCell('G2').value = 'Responsable';
    worksheet.getCell('H2').value = 'Teléfono Responsable';
    worksheet.getCell('I2').value = 'Correo Responsable';

    // Datos
    let row = 3;
    Obras.forEach((obra) => {
      worksheet.getCell('A' + row).value = obra._id;
      worksheet.getCell('B' + row).value = obra.Nombre_Obra;
      worksheet.getCell('C' + row).value = obra.Direccion;
      worksheet.getCell('D' + row).value = obra.FechaInicio;
      worksheet.getCell('E' + row).value = obra.FechaFin;
      worksheet.getCell('F' + row).value = obra.Dueno;
      worksheet.getCell('G' + row).value = obra.Responsable;
      worksheet.getCell('H' + row).value = obra.Tel_resp;
      worksheet.getCell('I' + row).value = obra.Correo_resp;
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
    const letras = 'ABCDEFGHI';
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
