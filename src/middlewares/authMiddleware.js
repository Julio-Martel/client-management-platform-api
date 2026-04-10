const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;

     if (!authHeader) {
        return res.status(401).json({ mensaje: 'Token requerido' });
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'secreto');

        req.usuario = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: 'Token inválido' });
    }   

}

module.exports = {authMiddleware};