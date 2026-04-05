const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/cliente.controller');

router.get('/', clienteController.getCliente);
router.post('/', clienteController.createCliente);
router.delete('/:id',clienteController.deleteCliente);

module.exports = router;