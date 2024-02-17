const { Router } = require("express");
const { check } = require('express-validator');
const {  googleSignIn } = require("../controllers/auth");
const { validateInput } = require("../middlewares/fieldValidations");

const router = Router();

router.post('/google', [
            check('id_token', 'google token is required').not().isEmpty(),
            validateInput
    ], googleSignIn)

module.exports = router;