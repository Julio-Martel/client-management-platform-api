const db = require('../config/db');

exports.getClientes = async(req,res) => {
    try{
        const [rows] = await db.query('SELECT * FROM Clientes');
        res.json(rows);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}