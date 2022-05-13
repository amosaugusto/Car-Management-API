const adminRepository = require("../repositories/adminRepository");

module.exports = {
    findById(id) {
        return adminRepository.getById(id);
    },
    findByEmail(email) {
        return adminRepository.getByEmail(email);
    },
    create(admin) {
        return adminRepository.create(admin);
    }
}