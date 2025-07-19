const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Obtener todos los perfiles
router.get('/', async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

// Crear un perfil
router.post('/', async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save();
  res.status(201).json(profile);
});

// Eliminar un perfil
router.delete('/:id', async (req, res) => {
  await Profile.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Actualizar un perfil
router.put('/:id', async (req, res) => {
  const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProfile);
});

module.exports = router;