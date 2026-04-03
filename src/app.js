const express = require('express');
const app = express();

const server = require('../src/server');

app.use(express.json());

app.use('/clientes', server);

app.listen(3000,() => {
    console.log('Servidor en funcionamiento...');
})