const db = require('../config/db');

const login = async(req,res,next) => {
    const {usuario, pass} = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM Clientes WHERE usuario = ? AND  pass = ?',[usuario,pass]);

        if(rows.length === 0){
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            })
        }

    } catch(Error){
        res.status(500).json('Error del servidor');
    }

    next();

}


module.exports = {login};