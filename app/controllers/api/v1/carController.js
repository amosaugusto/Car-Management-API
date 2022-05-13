const carService = require("../../../services/carService");

const listCar = async (req, res) => {
    try {
        const cars = await carService.findAll();
        res.status(200).json({
            status: "OK",
            cars,
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const createCar = async (req, res) => {
    const car = {
        name: req.body.name,
        isDelete: false,
        createdBy: req.user.email
    };
    try {
        await carService.create(car);
        res.status(201).json({
            message: "Car Created",
            data: car,
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateCar = async (req, res) => {
    const car = {
        id: req.params.id,
        name: req.body.name,
        updatedBy: req.user.email,
    };
    try {
        await carService.updateById(car);
        res.status(200).json({
            message: "Car Updated",
            data: car,
        })
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteCar = async (req, res) => {
    const car = {
        id: req.params.id,
        isDelete: true,
        deletedBy: req.user.email,
    };
    try {
        await carService.deleteById(car);
        res.status(200).json({
            message: "Car Deleted",
            data: car,
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    listCar,
    createCar,
    updateCar,
    deleteCar
}