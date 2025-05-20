const express = require('express');
const router = express.Router();

/* Página de inicio */
router.get('/', (req, res) => {
  res.render('index', { title: 'Aplicación To Do List' });
});

module.exports = router;
