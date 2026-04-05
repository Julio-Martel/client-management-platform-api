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

const deleteCliente = async(req,res) => {
    const id = req.params.id;

    try {
        
        const [resultado] = await db.query(
            "DELETE FROM Clientes WHERE id = ?"
            , [id]);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.send("Usuario eliminado correctamente");

    } catch(error){
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
}

module.exports = {
    getCliente,
    createCliente,
    deleteCliente
}
