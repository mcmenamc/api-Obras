import { Schema, model } from 'mongoose';

const DetalleNotaSchema = new Schema({
  Obra: {
    type: Schema.Types.ObjectId,
    ref: 'Obra',
    required: true
  },
  Prove: {
    type: Schema.Types.ObjectId,
    ref: 'Provedor',
    required: true
  },
  Material: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: true
  },
  Nota: {
    type: Schema.Types.ObjectId,
    ref: 'Nota',
    required: true
  },
  Cantidad: {
    type: Number,
    required: true
  },
  PrecioUnitario: {
    type: Number,
    required: true
  },
  Extra: {
    type: String,
    MaxLength: 120
  }
}, {
  versionKey: false
});

export default model('DetalleNota', DetalleNotaSchema);
