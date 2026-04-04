const db = require('../config/db');

const getCliente = async(req,res) => {
    try{
        const [rows] = await db.query('SELECT * FROM Clientes');
        res.json(rows);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

const createCliente = async(req,res) => {  
    const { nombre, email, telefono } = req.body;

    console.log(nombre,telefono,email)


    if(!nombre || !email || !telefono){
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
    const [result] = await db.query(
    `INSERT INTO clientes (nombre, email, telefono)
    VALUES (?, ?, ?)`,
    [nombre, email, telefono]
    );

        res.json({
        id: result.insertId,
        nombre,
        email,
        telefono
        });

    } catch(error){
        console.log(error);
      res.status(500).json({ error: 'Error al crear cliente' });
    }

}


module.exports = {
    getCliente,
    createCliente
}
