const superAdminRepository = require("../repositories/superAdminRepository");

module.exports = {
    findById(id) {
        return superAdminRepository.getById(id);
    },
    findByEmail(email) {
        return superAdminRepository.getByEmail(email);
    },
}