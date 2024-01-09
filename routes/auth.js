const { Router } = require("express");
const { check } = require('express-validator');
const { login } = require("../controllers/auth");
const { validateInput } = require("../middlewares/fieldValidations");

const router = Router();

router.post('/login', [
            check('email', 'email format is invalid').isEmail(),
            check('password', 'password is required').not().isEmpty(),
            validateInput
    ], login)

module.exports = router;