const express = require('express');
const router = express.Router();

// GET listado de usuarios (ejemplo básico)
router.get('/', (req, res) => {
  res.json({ message: 'Aquí va el listado de usuarios' });
});

module.exports = router;
