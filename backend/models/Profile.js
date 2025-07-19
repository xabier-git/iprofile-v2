const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  codigoSituacionSentimental: { type: String, required: true },
  equipoActual: { type: String, required: true }
});

module.exports = mongoose.model('Profile', profileSchema);