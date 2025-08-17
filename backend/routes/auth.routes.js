const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log("Auth.routes.js: /signup", req.body);
  try {
    const { username, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
       if (/*error.name === 'MongoServerError' &&*/ error.code === 11000) {
        console.error("Auth.routes.js: /signup duplicate key error", error);
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
      }
      console.error("Auth.routes.js: /signup error", error);
      res.status(500).json({ message: 'Error interno del servidor' });
  } 
});

// login
router.post('/login', async (req, res) => {
  console.log("Auth.routes.js: /login", req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log("Auth.routes.js: /login user found", user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.error("Auth.routes.js: /login invalid credentials", { username });
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    console.log("Auth.routes.js: /login JWT_SECRET", process.env.JWT_SECRET);
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Auth.routes.js: /login token", token);
    res.status(200).json({ token });
  } catch (error) {
      console.error("Auth.routes.js: /login error", error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }   
});

module.exports = router;