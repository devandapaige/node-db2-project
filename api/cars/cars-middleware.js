const cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await cars.getById(id);
    if (!car) {
      return res.status(404).json({ message: "this id was not found" });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = async (req, res, next) => {
  try {
    const { vin, make, model, mileage } = req.body;
    if (!vin || !make || !model || !mileage) {
      return res
        .status(400)
        .json({ message: "vin, make, model, and mileage are required" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberValid = async (req, res, next) => {
  try {
    const isValid = vinValidator.validate(req.body.vin);
    if (!isValid) {
      res.status(400).json({ message: `VIN ${req.body.vin} is invalid` });
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const getAll = await cars.getAll();
    const vin = req.body.vin;
    const checkUnique = getAll.filter((item) => {
      if (item.vin === vin) {
        return item;
      }
    });
    if (checkUnique.length > 0) {
      res.status(400).json({ message: "this vin is already in system" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkVinNumberUnique,
  checkVinNumberValid,
  checkCarId,
  checkCarPayload,
};
