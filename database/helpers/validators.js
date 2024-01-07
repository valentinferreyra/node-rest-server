const Role = require('../../models/role');
const User = require('../../models/user');

const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
            throw new Error(`role ${role} is not registered in the database`);
    }
}

const existsEmail =  async (email = '') => {
    await User.findOne( { email } )
    if (existsEmail) {
        throw new Error(`email ${email} is already registered in the database`);
    }
}

const existsUserById = async (id) => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`id ${id} does not exist`);
    }
}

module.exports = {
    isValidRole,
    existsEmail,
    existsUserById
}