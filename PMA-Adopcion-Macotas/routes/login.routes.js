const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { /*login*/getUsuarioLogin } = require('../controllers/login.controller');

const router = Router();

router.post(
    "/",
    [
        check("correo", "Este no es un correo válido").isEmail().not().isEmpty(),
        check("password", "El password es obligatorio").not().isEmpty(),
        validarCampos,
    ],getUsuarioLogin);

    module.exports = router;
