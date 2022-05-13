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
  create(superAdmin) {
    return Superadmin.create({
      email: superAdmin.email,
      password: superAdmin.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
};