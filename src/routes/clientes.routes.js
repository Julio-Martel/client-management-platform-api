const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/cliente.controller');
const middleware = require('../middlewares/authMiddleware');

router.get('/', clienteController.getCliente);
router.post('/login', middleware.login , clienteController.createCliente);
router.delete('/:id',clienteController.deleteCliente);

module.exports = router;