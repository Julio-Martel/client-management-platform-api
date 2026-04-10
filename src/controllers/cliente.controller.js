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

const bcrypt = require('bcrypt');

const createCliente = async(req, res) => {

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

        const hashedPassword = await bcrypt.hash(pass, 10);

        const [result] = await db.query(
            `INSERT INTO clientes (nombre, usuario, pass, email, telefono, rol)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, usuario, hashedPassword, email, telefono, rol]
        );

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

const updateCliente = async(req,res) => {
    const {id} = req.params;
    const {usuario} = req.body;
    
    try{

        const resultado = db.query('UPDATE Clientes SET usuario = ? WHERE id = ? ',[usuario,id]);

        res.json({ mensaje: 'Usuario actualizado correctamente' });

    } catch(error){
        console.log(error);
    }


}

const putCliente = async(req,res) => {
    const {id} = req.params;
    const {nombre, usuario, pass, email, telefono, rol} = req.body;

    if(!nombre || !usuario || !pass || !email || !telefono || !rol){
        return res.send('Debe rellenar los campos');
    }

    /*CORREJIR ESTO PARA VER COMO CONTINUAR*/


    try {

        const hashedPassword = await bcrypt.hash(pass, 10);

        const [rows] = await db.query('UPDATE Clientes SET nombre = ?, usuario = ?, pass = ?, email = ?, telefono = ?, rol = ? WHERE id = ?',[nombre,usuario,hashedPassword,email,telefono,rol,id]);


        res.status(201).json({
            id: rows.insertId,
            nombre,
            usuario,
            email,
            telefono,
            rol
        });

    } catch(error){
        console.log(error);
    }
}


/*const deleteCliente = async(req,res) => {
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
}*/

module.exports = {
    getCliente,
    createCliente,
    updateCliente,
    putCliente
}
