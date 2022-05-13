const carRepository = require("../repositories/carRepository");

module.exports = {
    findAll() {
        return carRepository.getAll();
    },
    create(car) {
        return carRepository.create(car);
    },
    updateById(car) {
        return carRepository.updateById(car);
    },
    deleteById(car) {
        return carRepository.deleteById(car);
    },
}