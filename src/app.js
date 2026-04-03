const express = require('express');
const clientesRoutes = require('../src/routes/clientes.routes');

const app = express();
app.use(express.json());

app.use('/clientes', clientesRoutes);

module.exports = app;