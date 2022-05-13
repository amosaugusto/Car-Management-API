const { Member } = require("../models");

module.exports = {
  getById(id) {
    return Member.findByPk(id);
  },
  getByEmail(email) {
    return Member.findOne({
      where: {
        email,
      },
    });
  },
  create(member) {
    return Member.create({
      email: member.email,
      password: member.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
};
