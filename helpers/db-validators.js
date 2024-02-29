const Usuario = require('../models/usuario');
const Mascota = require('../models/mascota');
const Role = require('../models/role')
 
const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}
 
const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(!existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const existeMascotaById = async ( id = '') => {
    const existeMascota = await Mascota.findOne({id});
    if(!existeMascota){
        throw new Error(`La mascota con el ${ id } no existe`);
    }
}

const existeMascota = async ( nombre= '', especie= '', estado= '', raza= '') => {
    const existeMascota = await Mascota.findOne({ nombre, especie, estado, raza});
    if(existeMascota){
        throw new Error(`La mascota con los datos ${ nombre, especie, raza } ya fue registrada`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido,
    existeMascotaById,
    existeMascota
}