const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const exists = await User.findOne({ username: 'admin' });
  if (!exists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({ username: 'admin', password: hashedPassword, role: 'admin' });
    console.log('Usuario admin creado');
  } else {
    console.log('Usuario admin ya existe');
  }
  mongoose.disconnect();
});