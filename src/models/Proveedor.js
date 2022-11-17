import { Schema, model } from 'mongoose';

const ProveedorSchema = new Schema({
  RazonSoc: {
    type: String,
    MaxLength: 150,
    required: true
  },
  Agente: {
    type: String,
    MaxLength: 120,
    required: true
  },
  Direccion: {
    type: String
  },
  Telefono: {
    type: String,
    MaxLength: 20,
    required: true
  },
  Correo: {
    type: String,
    MaxLength: 150,
    required: true
  },
  TipoMaterial: {
    type: String,
    MaxLength: 90
  }
}, {
  versionKey: false
});

export default model('Proveedor', ProveedorSchema);
