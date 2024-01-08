const { Router } = require("express");
const { getUsers, 
        createUser, 
        updateUser, 
        deleteUser } = require("../controllers/user");
const { check } = require('express-validator');
const { validateInput } = require("../middlewares/fieldValidations");
const { isValidRole, existsEmail, existsUserById } = require("../database/helpers/validators");

const router = Router();

router.get('/', getUsers);

router.put('/:id', [
                check('id', 'id is invalid').isMongoId(),
                check('id').custom(existsUserById),
                check('role').custom(isValidRole),
                validateInput
        ], updateUser);

router.post('/', [
                check('email', 'email format is invalid').isEmail(),
                check('email').custom( existsEmail ),
                check('name', 'name is required').not().isEmpty(),
                check('password', 'password must be at least 6 characters').isLength({ min: 6 }),
                check('role').custom( isValidRole ),
                validateInput
        ], createUser);

router.delete('/:id', [
                check('id', 'id is invalid').isMongoId(),
                check('id').custom(existsUserById),
                validateInput
        ], deleteUser);

module.exports = router;