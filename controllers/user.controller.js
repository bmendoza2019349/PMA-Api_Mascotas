const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { existenteEmail } = require('../helpers/db-validators');

const usuariosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    })
}

const getUsuarioByid = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        usuario
    })
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    await Usuario.findByIdAndUpdate(id, resto);

    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        msg: 'Usuario Actualizado exitosamente',
        usuario
    })

}

const usuariosDelete = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'usuario eliminado exitosamente'
    });
}


const usuariosPost = async (req, res) => {
    try {
        const { nombre, correo, password, role } = req.body;
        const usuario = new Usuario({ nombre, correo, password, role });

        await existenteEmail(correo);

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        res.status(200).json({
            usuario
        });
    } catch (error) {
        res.status(409).json({
            error: error.message,
        });
    }
}

module.exports = {
    usuariosPost,
    usuariosGet,
    getUsuarioByid,
    usuariosPut,
    usuariosDelete
}