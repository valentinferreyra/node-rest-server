const { response } = require("express");


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

const createUser = (req, res = response) => {
    const { name, age } = req.body;

    res.json({
        msg: 'post API - controller',
        name,
        age
    });
}

const updateUser = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'put API - controller',
        id
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