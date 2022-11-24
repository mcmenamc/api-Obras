import DetalleNotaModel from '../models/DetalleNota.js';
import exceljs from 'exceljs';
import { EstiloCelda, EstiloEncabezado } from '../utils/Excel.Style.js';

export const getDetalleNotas = async (req, res) => {
  try {
    const detalleNotas = await DetalleNotaModel.find().populate('Obra').populate('Nota').populate('Material').populate('Prove');

    res.status(200).json(detalleNotas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDetalleNota = async (req, res) => {
  const { id } = req.params;

  try {
    const detalleNota = await DetalleNotaModel.findById(id).populate('Obra').populate('Provedor').populate('Material').populate('Nota');

    res.status(200).json(detalleNota);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDetalleNota = async (req, res) => {
  try {
    const {
      Obra,
      Prove,
      Material,
      Nota,
      Cantidad,
      PrecioUnitario,
      Extra
    } = req.body;
    if (!Obra || !Prove || !Material || !Nota || !Cantidad || !PrecioUnitario) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const newDetalleNota = {
      Obra,
      Prove,
      Material,
      Nota,
      Cantidad,
      PrecioUnitario,
      Extra
    };
    await DetalleNotaModel.create(newDetalleNota);

    res.status(201).json(newDetalleNota);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const DeleteDetalleNota = async (req, res) => {
  const { id } = req.params;
  try {
    const detalleNota = await DetalleNotaModel
      .findByIdAndDelete(id)
      .populate('Obra')
      .populate('Prove')
      .populate('Material')
      .populate('Nota');
    res.status(200).json(detalleNota);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDetalleNotasByDate = async (req, res) => {
  const { dateInicio, dateFin, idObra } = req.params;
  if (!dateInicio || !dateFin || !idObra) { return res.status(400).json({ message: 'Faltan datos' }); }

  const dateInicioDate = new Date(dateInicio);
  const dateFinDate = new Date(dateFin);
  try {
    const detalleNotas = await DetalleNotaModel.find().populate('Obra').populate('Prove').populate('Material').populate('Nota');

    const detalleNotasByDate = detalleNotas.filter((detalleNota) => {
      const detalleNotaDate = new Date(detalleNota.Nota.Fecha);
      // eslint-disable-next-line eqeqeq
      return detalleNotaDate >= dateInicioDate && detalleNotaDate <= dateFinDate && detalleNota.Obra._id == idObra;
    });

    res.status(200).json(detalleNotasByDate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDetallesNotaslExcel = async (req, res) => {
  try {
    const detalleNotas = await DetalleNotaModel.find().populate('Obra').populate('Nota').populate('Material').populate('Prove');

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Detalles Notas');

    worksheet.mergeCells('A1:H1');
    worksheet.getCell('A1').value = 'Lista de Detalles Notas';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 100;

    // Encabezados
    worksheet.getCell('A2').value = 'Identificador';
    worksheet.getCell('B2').value = 'Obra';
    worksheet.getCell('C2').value = 'Proveedor';
    worksheet.getCell('D2').value = 'Material';
    worksheet.getCell('E2').value = 'Nota';
    worksheet.getCell('F2').value = 'Cantidad';
    worksheet.getCell('G2').value = 'Precio Unitario';
    worksheet.getCell('H2').value = 'Extra';

    // Datos
    let row = 3;
    detalleNotas.forEach((detallenota) => {
      worksheet.getCell('A' + row).value = detallenota._id;
      worksheet.getCell('B' + row).value = detallenota.Obra._id;
      worksheet.getCell('C' + row).value = detallenota.Prove._id;
      worksheet.getCell('D' + row).value = detallenota.Material._id;
      worksheet.getCell('E' + row).value = detallenota.Nota._id;
      worksheet.getCell('F' + row).value = detallenota.Cantidad;
      worksheet.getCell('G' + row).value = detallenota.PrecioUnitario;
      worksheet.getCell('H' + row).value = detallenota.Extra;
      row++;
    });

    // Estilos
    worksheet.getRow(2).eachCell((cell) => {
      cell.fill = EstiloEncabezado.fill;
      cell.font = EstiloEncabezado.font;
      cell.alignment = EstiloEncabezado.alignment;
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
    const letras = 'ABCDEFGH';
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
