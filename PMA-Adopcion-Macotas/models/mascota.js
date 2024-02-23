const { Schema, model} = require('mongoose');

const MascotaSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    especie: {
        type: String,
        required: [true, 'El especie es obligatorio']
    },
    estado: {
        type: String,
        enum: ["EnAdopcion", "Adoptado"],
        default: "EnAdopcion"
    },
    raza: {
        type: String,
        required: [true, 'La raza es obligatoria']
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es Obligatoria']
    },
    residencia: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    sexo: {
        type: String,
        required: [true, 'El sexo es obligatorio']
    },
    color: {
        type: String,
        required: [true, 'El color es obligatorio']
    }

});

module.exports = model('Mascota', MascotaSchema);