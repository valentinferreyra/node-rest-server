const { response } = require("express");


const getUsers = (req, res = response) => {
    res.json({
        msg: 'get API - controller'
    });
}

const createUser = (req, res = response) => {
    const { name, age } = req.body;

    res.json({
        msg: 'post API - controller',
        name,
        age
    });
}

const updateUser = (req, res = response) => {
    res.json({
        msg: 'put API - controller'
    });
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser
}