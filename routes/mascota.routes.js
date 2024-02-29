const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeMascotaById } = require('../helpers/db-validators');
const { mascotaPost, mascotaGet, getMascotaByid, mascotasPut, mascotasDelete} = require('../controllers/mascotas.controller');


const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("especie", "la especie es obligatoria").not().isEmpty(),
        check("raza", "La raza es obligatoria").not().isEmpty(),
        check("fechaNacimiento", "La fecha de Nacimiento es obligatoria").not().isEmpty(),
        check("fechaNacimiento", "Formato de fecha inválido").isDate(),
        check("residencia", "La residencia es obligatoria").not().isEmpty(),
        check("sexo", "El sexo es obligatorio").not().isEmpty(),
        check("color", "El color es obligatorio").not().isEmpty(),
        validarCampos,
    ], mascotaPost);

router.get("/", mascotaGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ],getMascotaByid
);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotasPut
);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotasDelete
);
    module.exports = router;