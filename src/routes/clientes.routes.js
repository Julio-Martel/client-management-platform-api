const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/cliente.controller');
const authMiddleware = require('../middlewares/authMiddleware');
//const adminMiddleware = require('../middlewares/adminMiddleware');
//const authController = require('../controllers/authController');

router.post('/', clientesController.createCliente);

module.exports = router;