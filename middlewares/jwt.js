const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'token is required'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const authenticatedUser = await User.findById(uid);

        if (!authenticatedUser) {
            return res.status(401).json({
                msg: 'user does not exist'
            });
        }

        if (!authenticatedUser.isActive) {
            return res.status(401).json({
                msg: 'inactive user'
            });
        }

        req.authenticatedUser = authenticatedUser;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    validateJWT
}