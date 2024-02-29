const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

/*login*/
const getUsuarioLogin = async (req, res) => {

    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
        res.status(401).json({
            msg: 'Correo Incorrecta'
        });
    } else {
        const Validacionpassword = bcryptjs.compareSync(password, usuario.password);

        if (!Validacionpassword) {
            res.status(401).json({
                msg: 'Contraseña Incorrecta'
            })
        }else{
            res.status(200).json({
                msg: 'Credenciales Validas',
                usuario
            })
        }
    }
}
module.exports = {
    getUsuarioLogin
}