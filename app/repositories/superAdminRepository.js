const {
  Superadmin
} = require("../models");

module.exports = {
  getById(id) {
    return Superadmin.findByPk(id);
  },
  getByEmail(email) {
    return Superadmin.findOne({
      where: {
        email,
      },
    });
  },
};