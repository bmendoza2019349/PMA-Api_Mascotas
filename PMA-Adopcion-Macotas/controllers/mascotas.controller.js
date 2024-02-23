const { response, json, query } = require('express');
const bcryptjs = require('bcryptjs');
const Mascota = require('../models/mascota');
const { existeMascota } = require('../helpers/db-validators');

const mascotaPost = async (req, res) => {
    try {
        const { nombre, especie, raza, fechaNacimiento, residencia, sexo, color } = req.body;
        const mascota = new Mascota({ nombre, especie, raza, fechaNacimiento, residencia, sexo, color });
        const salt = bcryptjs.genSaltSync();
        await existeMascota(nombre, especie, raza);
        await mascota.save();
        res.status(200).json({
            mascota
        });
    } catch (error) {
        res.status(409).json({
            error: error.message,
        });
    }

}

const mascotaGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: "EnAdopcion" };
    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}

const getMascotaByid = async (req, res) => {
    const { id } = req.params;
    const mascotas = await Mascota.findOne({ _id: id });

    res.status(200).json({
        mascotas
    });
}

const mascotasPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    await Mascota.findByIdAndUpdate(id, resto);
    const mascotas = await Mascota.findOne({ _id: id });

    res.status(200).json({
        msg: 'Mascota Actualizada exitosamente',
        mascotas
    })
}

const mascotasDelete = async (req, res) => {
    const { id } = req.params;
    await Mascota.findByIdAndUpdate(id, { estado: "Adoptado" });
    const mascotas = await Mascota.findOne({ _id: id });

    res.status(200).json({
        msg: 'Mascota Eliminada exitosamente',
        mascotas
    })
}

module.exports = {
    mascotaPost,
    mascotaGet,
    getMascotaByid,
    mascotasPut,
    mascotasDelete
}