const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/cliente.controller');
const middlewareLogin = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', clienteController.getCliente);
router.post('/', middlewareLogin.login , adminMiddleware.verificarRol ,clienteController.createCliente);
router.delete('/:id',clienteController.deleteCliente);

module.exports = router;