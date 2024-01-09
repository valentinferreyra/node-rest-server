const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../database/helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'email or password is incorrect'
            });
        }

        if (!user.isActive) {
            return res.status(400).json({
                msg: 'email or password is incorrect'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'email or password is incorrect'
            });
        }

        const token = await generateJWT(user.id);
     
        res.json({
            msg: 'login ok',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'something went wrong'
        });
    }
}

module.exports = {
    login
}