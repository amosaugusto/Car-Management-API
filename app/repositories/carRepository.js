const {
  Car
} = require("../models");
const {
  Op,
  DATE
} = require("sequelize");
const res = require("express/lib/response");

module.exports = {
  getAll() {
    return Car.findAll({
      where: {
        isDelete: {
          [Op.eq]: false,
        },
      },
    });
  },
  create(car) {
    return Car.create({
      name: car.name,
      isDelete: false,
      created_by: car.createdBy,
      deleted_by: null,
      updated_by: car.createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
  updateById(car) {
    return Car.findOne({
      where: {
        id: car.id,
      },
    }).then((updatedCar) => {
      if (!updatedCar) return res.status(404).send();
      updatedCar.update({
        name: car.name,
        updated_by: car.updatedBy,
        updatedAt: new Date(),
      });
    });
  },
  deleteById(car) {
    return Car.findOne({
      where: {
        id: car.id,
      },
    }).then((deletedCar) => {
      if (!deletedCar) return res.status(404).send();
      deletedCar.update({
        isDelete: true,
        deleted_by: car.deletedBy,
        updatedAt: new Date(),
      });
    });
  },
};