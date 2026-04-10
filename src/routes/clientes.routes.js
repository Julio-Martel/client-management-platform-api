const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/cliente.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', authMiddleware.authMiddleware, adminMiddleware.soloAdmin, clientesController.getCliente);
router.post('/', authMiddleware.authMiddleware, adminMiddleware.soloAdmin, clientesController.createCliente);
router.patch('/:id', authMiddleware.authMiddleware, adminMiddleware.soloAdmin, clientesController.updateCliente );


module.exports = router;