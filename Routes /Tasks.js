const express = require('express');
const router = express.Router();

// Arreglo temporal de tareas (no se guarda en BD)
let tasks = [
  {
    id: 1,
    name: 'Tarea 1',
    description: 'Descripción de la tarea 1',
  },
  {
    id: 2,
    name: 'Tarea 2',
    description: 'Descripción de la tarea 2',
  },
  {
    id: 3,
    name: 'Tarea 3',
    description: 'Descripción de la tarea 3',
  },
];

// Obtener todas las tareas
router.get('/getTasks', (req, res) => {
  res.json(tasks);
});

// Agregar una nueva tarea
router.post('/addTask', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    name: req.body.name,
    description: req.body.description,
  };
  tasks.push(newTask);
  res.json({ message: 'Tarea agregada correctamente', task: newTask });
});

// Eliminar una tarea por ID
router.delete('/removeTask/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Tarea eliminada correctamente' });
});

module.exports = router;
