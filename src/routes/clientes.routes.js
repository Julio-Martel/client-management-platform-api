const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/cliente.controller');

router.get('/', clienteController.getCliente);
router.post('/', clienteController.createCliente);

module.exports = router;