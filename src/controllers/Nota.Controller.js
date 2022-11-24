import NotaModel from '../models/Nota.js';
import exceljs from 'exceljs';
import { EstiloCelda, EstiloEncabezado } from '../utils/Excel.Style.js';

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

export const createNotaExcel = async (req, res) => {
  try {
    const notas = await NotaModel.find();
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Notas');

    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Lista de Notas';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 100;

    // Encabezados
    worksheet.getCell('A2').value = 'Identificador';
    worksheet.getCell('B2').value = 'Fecha';
    worksheet.getCell('C2').value = 'Extra';
    // Datos
    let row = 3;
    notas.forEach((nota) => {
      worksheet.getCell('A' + row).value = nota._id;
      worksheet.getCell('B' + row).value = nota.Fecha;
      worksheet.getCell('C' + row).value = nota.Extra;
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
    const letras = 'ABC';
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
