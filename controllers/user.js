const { response } = require("express");
const User  = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async(req, res = response) => {
    const { limit = 5, offset = 0 } = req.query;

    if (isNaN(limit) || isNaN(offset)) {
        return res.status(400).json({
            msg: 'limit and offset must be numbers'
        });
    }

    const [ total, users ] = await Promise.all([
        User.countDocuments({ isActive: true }),
        User.find({ isActive: true })
            .skip(Number(offset))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
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

const deleteUser = async(req, res = response) => {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, { isActive: false });

    res.json({
        msg: `user ${user.name} deleted`
    });
}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser
}