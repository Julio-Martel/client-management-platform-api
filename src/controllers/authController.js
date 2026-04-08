const db = require('../config/db');
const jwt = require('jsonwebtoken');

const login = async(req,res) => {
    const {usuario, pass} = req.body;

    if(!usuario || !pass){
        return res.status(404).json({mensaje: 'Debe rellenar todos los campos.'})
    }

    try {
        const [rows] = await db.query('SELECT * FROM Clientes WHERE usuario = ? AND  pass = ?',[usuario,pass]);

        if(rows.length === 0){
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            })
        }

        const user = rows[0];

        const token = jwt.sign(
            {id: user.id,
            rol: user.rol},
            'secreto',
            {
                expiresIn: '1h'
            }
        );

        res.json({
            mensaje: "Login correcto",
            token: token
        });


    } catch(Error){
        res.status(500).json('Error del servidor');
    }
}

module.exports = {login};