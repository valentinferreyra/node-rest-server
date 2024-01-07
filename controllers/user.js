const { response } = require("express");
const User  = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = (req, res = response) => {
    const { q, name = 'no name', apiKey, limit = 10, offset = 0 } = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        name,
        apiKey,
        limit,
        offset
    });
}

const createUser = async(req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const updateUser = async(req, res = response) => {
    const id = req.params.id; 
    const { _id, password, createdFromGoogle, email, ...body } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, body)

    res.json({
        msg: 'put API - controller',
        user
    });
}

const deleteUser = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'delete API - controller',
        id
    });
}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser
}