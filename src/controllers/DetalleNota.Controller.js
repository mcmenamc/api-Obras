import DetalleNotaModel from '../models/DetalleNota.js';
import exceljs from 'exceljs';

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
  const { dateInicio, dateFin } = req.params;

  const dateInicioDate = new Date(dateInicio);
  const dateFinDate = new Date(dateFin);
  try {
    const detalleNotas = await DetalleNotaModel.find().populate('Obra').populate('Prove').populate('Material').populate('Nota');
    const detalleNotasByDate = detalleNotas.filter((detalleNota) => {
      const detalleNotaDate = new Date(detalleNota.Nota.Fecha);
      return detalleNotaDate >= dateInicioDate && detalleNotaDate <= dateFinDate;
    });
    res.status(200).json(detalleNotasByDate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const CreateExcelAll = async (req, res) => {
  try {
    const detalleNotas = await DetalleNotaModel.find()
      .populate('Obra')
      .populate('Nota')
      .populate('Material')
      .populate('Prove');
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Detalle Notas');

    worksheet.mergeCells('A1:V1');
    worksheet.getCell('A1').value = 'Lista de Detalle Notas';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 100;

    // Encabezados
    worksheet.getCell('A2').value = 'Nombre Obra';
    worksheet.getCell('B2').value = 'Direccion';
    worksheet.getCell('C2').value = 'Fecha Inicio';
    worksheet.getCell('D2').value = 'Fecha Fin';
    worksheet.getCell('E2').value = 'Dueño';
    worksheet.getCell('F2').value = 'Responsable';
    worksheet.getCell('G2').value = 'Telefono Responsable';
    worksheet.getCell('H2').value = 'Correo Responsable';

    worksheet.getCell('I2').value = 'Fecha Nota';
    worksheet.getCell('J2').value = 'Extra';

    worksheet.getCell('K2').value = 'Nombre Material';
    worksheet.getCell('L2').value = 'Marca';
    worksheet.getCell('M2').value = 'Categoria';
    worksheet.getCell('N2').value = 'Unidad Medida';

    worksheet.getCell('O2').value = 'Razon Social';
    worksheet.getCell('P2').value = 'Agente';
    worksheet.getCell('Q2').value = 'Direccion';
    worksheet.getCell('R2').value = 'Telefono';
    worksheet.getCell('S2').value = 'Correo';

    worksheet.getCell('T2').value = 'Cantidad';
    worksheet.getCell('U2').value = 'Precio Unitario';
    worksheet.getCell('V2').value = 'Extra';

    // Datos
    let row = 3;
    detalleNotas.forEach((detalleNota) => {
      worksheet.getCell(`A${row}`).value = detalleNota.Obra.Nombre_Obra;
      worksheet.getCell(`B${row}`).value = detalleNota.Obra.Direccion;
      worksheet.getCell(`C${row}`).value = detalleNota.Obra.FechaInicio;
      worksheet.getCell(`D${row}`).value = detalleNota.Obra.FechaFin;
      worksheet.getCell(`E${row}`).value = detalleNota.Obra.Dueno;
      worksheet.getCell(`F${row}`).value = detalleNota.Obra.Responsable;
      worksheet.getCell(`G${row}`).value = detalleNota.Obra.Tel_resp;
      worksheet.getCell(`H${row}`).value = detalleNota.Obra.Correo_resp;

      worksheet.getCell(`I${row}`).value = detalleNota.Nota.Fecha;
      worksheet.getCell(`J${row}`).value = detalleNota.Nota.Extra;

      worksheet.getCell(`K${row}`).value = detalleNota.Material.Nombre_Mat;
      worksheet.getCell(`L${row}`).value = detalleNota.Material.Marca;
      worksheet.getCell(`M${row}`).value = detalleNota.Material.Categoria;
      worksheet.getCell(`N${row}`).value = detalleNota.Material.UnidadMedida;

      worksheet.getCell(`O${row}`).value = detalleNota.Prove.RazonSoc;
      worksheet.getCell(`P${row}`).value = detalleNota.Prove.Agente;
      worksheet.getCell(`Q${row}`).value = detalleNota.Prove.Direccion;
      worksheet.getCell(`R${row}`).value = detalleNota.Prove.Telefono;
      worksheet.getCell(`S${row}`).value = detalleNota.Prove.Correo;

      worksheet.getCell(`T${row}`).value = detalleNota.Cantidad;
      worksheet.getCell(`U${row}`).value = detalleNota.PrecioUnitario;
      worksheet.getCell(`V${row}`).value = detalleNota.Extra;
      row++;
    });

    // Estilos
    const estiloEncabezado = {
      font: { bold: true },
      alignment: { vertical: 'middle', horizontal: 'center' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBFBFBF' } }
    };

    const estiloCelda = {
      font: {
        name: 'Arial',
        size: 12,
        bold: false,
        color: { argb: '7f7f80' }
      },
      alignment: {
        vertical: 'middle',
        horizontal: 'center'
      },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    worksheet.getRow(2).eachCell((cell) => {
      cell.fill = estiloEncabezado.fill;
      cell.font = estiloEncabezado.font;
      cell.alignment = estiloEncabezado.alignment;
      cell.border = estiloEncabezado.border;
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = estiloCelda.font;
        cell.alignment = estiloCelda.alignment;
        cell.border = estiloCelda.border;
      });
    });

    // for  de letras
    const letras = 'ABCDEFGHIJKLMNOPQRSTUV';
    for (let i = 0; i < letras.length; i++) {
      worksheet.getColumn(letras[i]).width = 20;
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
