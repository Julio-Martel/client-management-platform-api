const soloAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'Admin') {
        return res.status(403).json({ mensaje: 'No autorizado' });
    }
    next();
};

module.exports = { soloAdmin };