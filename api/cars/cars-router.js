const express = require("express");
const router = express.Router();
const cars = require("./cars-model");
const {
  checkVinNumberUnique,
  checkVinNumberValid,
  checkCarPayload,
  checkCarId,
} = require("./cars-middleware");

router.get("/api/cars", async (req, res, next) => {
  try {
    const getAll = await cars.getAll();
    res.status(200).json(getAll);
  } catch (err) {
    next(err);
  }
});

router.get("/api/cars/:id", checkCarId(), async (req, res, next) => {
  try {
    const singleCar = await cars.getById(req.params.id);
    res.status(200).json(singleCar);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/api/cars",
  checkCarPayload(),
  checkVinNumberValid(),
  checkVinNumberUnique(),
  async (req, res, next) => {
    try {
      const newCar = await cars.addNew(req.body);
      res.status(200).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/api/cars/:id",
  checkCarId(),
  checkVinNumberValid(),
  checkVinNumberUnique(),
  checkCarPayload(),
  async (req, res, next) => {
    try {
      const updates = req.body;
      const update = await cars.updateById(req.params.id, updates);
      res.status(200).json(update);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/index.jsapi/cars/:id", checkCarId(), async (req, res, next) => {
  try {
    await cars.removeById(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
