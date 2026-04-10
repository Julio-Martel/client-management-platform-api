const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('../src/routes/auth.routes');
const clienteRoutes = require('../src/routes/clientes.routes');

app.use('/api', authRoutes);        
app.use('/api/clientes', clienteRoutes);

module.exports = app;