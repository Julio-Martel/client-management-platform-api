const db = require('../config/db');

const getCliente = async(req,res) => {
    try{

        const [rows] = await db.query("SELECT COUNT(*) AS total FROM Clientes");

        if(rows[0].total !== 0){
            const [rows] = await db.query('SELECT * FROM Clientes');
            res.json(rows);            
        } else {
            return res.send('No hay clientes en la base de datos');
        }

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

const createCliente = async (req, res) => {
    const { nombre, usuario, pass, email, telefono, rol } = req.body;

    if (!nombre || !usuario || !pass || !email || !telefono || !rol) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM clientes WHERE usuario = ? OR email = ?',
            [usuario, email]
        );

        if (rows.length > 0) {
            return res.status(409).json({
                error: 'El usuario o email ya existe'
            });
        }

        // ✅ Insertar cliente (una sola vez)
        const [result] = await db.query(
            `INSERT INTO clientes (nombre, usuario, pass, email, telefono, rol)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, usuario, pass, email, telefono, rol]
        );


        /*
        
            CORREGIR ESTO PARA QUE SEA MAS COHERENTE
        
        
        */

        res.status(201).json({
            id: result.insertId,
            nombre,
            usuario,
            email,
            telefono,
            rol
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
};

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
