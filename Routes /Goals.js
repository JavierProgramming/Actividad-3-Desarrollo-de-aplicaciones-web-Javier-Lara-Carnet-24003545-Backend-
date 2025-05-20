const express = require('express');
const router = express.Router();

// Lista temporal de metas (no persistente)
let goals = [];

// Middleware para verificar apikey en el header Authorization
router.use((req, res, next) => {
  const apikey = req.headers['authorization'];
  const myApiKey = '12345abcde'; // Puedes cambiarla por la tuya

  if (apikey !== myApiKey) {
    return res.status(401).json({ error: 'No autorizado. Apikey inválida.' });
  }

  next();
});

// Obtener todas las metas
router.get('/getGoals', (req, res) => {
  res.json(goals);
});

// Agregar una nueva meta
router.post('/addGoal', (req, res) => {
  const { title, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (title y deadline).' });
  }

  const newGoal = {
    id: Date.now(),
    title,
    deadline
  };

  goals.push(newGoal);
  res.status(200).json({ message: 'Meta agregada correctamente.', goal: newGoal });
});

// Eliminar una meta por ID
router.delete('/removeGoal', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Falta el campo id.' });
  }

  const index = goals.findIndex(goal => goal.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Meta no encontrada.' });
  }

  const deleted = goals.splice(index, 1);
  res.status(200).json({ message: 'Meta eliminada correctamente.', deleted });
});

module.exports = router;
