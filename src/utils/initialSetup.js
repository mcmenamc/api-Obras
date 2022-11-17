import MaterialSchema from '../models/Material.js';
import NotaSchema from '../models/Nota.js';
import ObraSchema from '../models/Obra.js';
import ProveedorSchema from '../models/Proveedor.js';

(async () => {
  try {
    const count = await MaterialSchema.countDocuments();
    if (count > 0) return;

    const NewsMaterial = [
      {
        Nombre_Mat: 'Cemento Gris',
        Marca: 'Apasco',
        Categoria: 'Polvos',
        UnidadMedida: 'Bulto de 25 kg'
      },
      {
        Nombre_Mat: 'Pega Azulejo',
        Marca: 'Crest',
        Categoria: 'Polvos',
        UnidadMedida: 'Bulto de 15 kg'
      },
      {
        Nombre_Mat: 'Armex',
        Marca: 'Hylsa',
        Categoria: 'Acero',
        UnidadMedida: 'Pieza de 6mts'
      },
      {
        Nombre_Mat: 'Cal',
        Marca: 'Calídra',
        Categoria: 'Polvos',
        UnidadMedida: 'Bulto de 25 kg'
      },
      {
        Nombre_Mat: 'Varilla de 3/8',
        Marca: 'Hylsa',
        Categoria: 'Aceros',
        UnidadMedida: '1 pieza 12m'
      },
      {
        Nombre_Mat: 'Alambre recocid',
        Marca: '--',
        Categoria: 'Aceros',
        UnidadMedida: 'Kg'
      }
    ];
    await MaterialSchema.insertMany(NewsMaterial);
  } catch (erro) {
    console.log(erro);
  }
})();

(async () => {
  try {
    const count = await NotaSchema.countDocuments();
    if (count > 0) return;

    const NewsNotas = [
      {
        Fecha: '2022-10-17',
        Extra: 'Surtir y cobrar en la obra'
      }
    ];

    await NotaSchema.insertMany(NewsNotas);
    console.log('Notas creadas');
  } catch (erro) {
    console.log(erro);
  }
})();

(async () => {
  try {
    const count = await ObraSchema.countDocuments();
    if (count > 0) return;

    const NewsObras = [
      {
        Nombre_Obra: 'Residencia Sergio',
        Direccion: 'Fracc Heroes',
        FechaInicio: '2022-05-14',
        FechaFin: '2023-06-02',
        Dueno: 'Sergio Flores',
        Responsable: 'Arq Manuel',
        Tel_resp: '765757657',
        Correo_resp: 'manuel@gmail.com'
      }
    ];

    await ObraSchema.insertMany(NewsObras);
    console.log('Obras creadas');
  } catch (erro) {
    console.log(erro);
  }
})();

(async () => {
  try {
    const count = await ProveedorSchema.countDocuments();
    if (count > 0) return;

    const NewsProveedores = [
      {
        RazonSoc: 'Construrama',
        Agente: 'Juan',
        Direccion: '14 sur 11125',
        Telefono: '5876887',
        Correo: 'constru2@gmail.com'
      }
    ];

    await ProveedorSchema.insertMany(NewsProveedores);
    console.log('Proveedores creados');
  } catch (erro) {
    console.log(erro);
  }
})();
