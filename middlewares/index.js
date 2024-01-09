const fieldValidations = require("../middlewares/fieldValidations");
const jwt = require("../middlewares/jwt");
const roles = require("../middlewares/roles");

module.exports = {
    ...fieldValidations,
    ...jwt,
    ...roles,
}