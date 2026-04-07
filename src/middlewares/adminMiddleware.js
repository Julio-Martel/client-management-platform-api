const db = require('../config/db');

const verificarRol = async(req,res, next) => {
    const {usuario,pass} = req.body;

    try{
        const [rows] = await db.query('SELECT * FROM Clientes WHERE usuario = ? AND pass = ?',[usuario,pass]);

       if(rows[0].rol !== 'Admin'){
            return res.status(404).json({
                mensaje: "Debe ser admin para poder agregar un nuevo cliente"
            })
       }

    } catch(error){
        res.status(500).json({
            mensaje: 'Error del servidor'
        })
    }   

}

module.exports = {verificarRol};