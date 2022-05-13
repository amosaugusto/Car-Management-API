const memberRepository = require("../repositories/memberRepository");

module.exports = {
    findById(id) {
        return memberRepository.getById(id);
    },
    findByEmail(email) {
        return memberRepository.getByEmail(email);
    },
    create(member) {
        return memberRepository.create(member);
    },
}