const express = require('express');
const User = require('../models/user.model');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const users = await User.find({}, '-password'); // Excluye las contraseñas
  res.json(users);
});

router.get('/:id', authenticateToken, authorizeRole('user'), async (req, res) => {
  const user = await User.findById(req.params.id, '-password'); // Excluye la contraseña
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

module.exports = router;