const { response, json } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../database/helpers/jwt');
const { googleVerify } = require('../database/helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {
        const { email, name, img } = await googleVerify(id_token);

        let user = await User.findOne({ email });
        if (!user) {
            const data = {
                name, 
                email,
                password: 'google-password',
                img,
                createdFromGoogle: true,
                role: 'USER_ROLE'
            }

            user = new User(data);
            await user.save();
        }

        if (!user.isActive) {
            return res.status(401).json({
                msg: 'user is not active. contact the administrator'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
           msg: 'google token is not valid'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}