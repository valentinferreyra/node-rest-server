const { response } = require('express');

const hasRoles = (...roles) => {
    return (req, res = response, next) => {
        if (!req.authenticatedUser) {
            return res.status(500).json({
                msg: 'cannot verify role without validating the token first'
            });
        }

        const { role, name } = req.authenticatedUser;

        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `user ${name} does not have any of the following roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    hasRoles
}