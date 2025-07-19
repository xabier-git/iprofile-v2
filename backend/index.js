require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const profileRoutes = require('./routes/profiles');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

//app.use(morgan('dev')); // Para un formato de registro simple
// O para un formato personalizado:
app.use(morgan(':method :url :status :response-time ms'));

app.use('/api/profiles', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));