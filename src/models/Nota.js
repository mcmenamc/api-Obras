import { Schema, model } from 'mongoose';

const NotaSchema = new Schema({
  Fecha: {
    type: Date,
    required: true
  },
  Extra: {
    type: String,
    MaxLength: 120
  }

}, {
  versionKey: false
});

export default model('Nota', NotaSchema);
