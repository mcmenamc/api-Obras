import { Schema, model } from 'mongoose';

const ObraSchema = new Schema({
  Nombre_Obra: {
    type: String,
    MaxLength: 120,
    required: true
  },
  Direccion: {
    type: String,
    MaxLength: 120,
    required: true
  },
  FechaInicio: {
    type: Date,
    required: true
  },
  FechaFin: {
    type: Date,
    required: true
  },
  Dueno: {
    type: String,
    MaxLength: 120,
    required: true
  },
  Responsable: {
    type: String,
    MaxLength: 120,
    required: true
  },
  Tel_resp: {
    type: String,
    MaxLength: 20,
    required: true
  },
  Correo_resp: {
    type: String,
    MaxLength: 120,
    required: true
  }
}, {
  versionKey: false
});

export default model('Obra', ObraSchema);
