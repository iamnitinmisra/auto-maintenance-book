module.exports = {
  allGarageCars: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const cars = await db.garage.get_users_garage(id);
    if (!cars.length) {
      return res.status(204).send("No cars in Garage");
    }
    res.status(200).send(cars);
  },

  addToGarage: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { VIN, make, model, year } = req.body;
    try {
      const car = await db.garage.check_vin(VIN);
      if (!car.length) {
        const cars = await db.garage.add_to_garage(VIN, id, make, model, year);
        return res.status(201).send(cars);
      } else {
        return res
          .status(200)
          .send({ error: "Vehicle already exists in the database" });
      }
    } catch (err) {
      if (err) {
        console.error(`${err.severity}: ${err.detail}`);
        console.error(err);
        return res.status(444).send(`${err.severity}: ${err.detail}`);
      }
    }
  },

  addVehicleRecord: (req, res) => {
    const db = req.app.get("db");
    const { vin, workType, part, mileage, notes } = req.body;
    db.garage
      .add_vehicle_record(vin, workType, part, mileage, notes)
      .then((newRecord) => {
        db.garage.get_vehicle_records(vin).then((records) => {
          if (records.length) {
            res.status(200).send(records);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(444).send({ error: "That car dont exist, mate" });
      });
  },

  removeFromGarage: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { VIN } = req.body;
    db.garage.check_vin(VIN).then((matchingVIN) => {
      //check to see if the user has a car by that VIN and if so remove it and send the update garage
      !matchingVIN.length
        ? res.status(204).send({ error: "VIN not found" })
        : db.garage
            .remove_from_garage(VIN, id)
            .then((updatedGarage) => res.status(202).send(updatedGarage));
    });
  },

  vehicleRecords: (req, res) => {
    const db = req.app.get("db");
    const { vin } = req.query;
    db.garage.get_vehicle_records(vin).then((records) => {
      console.log(records);
      res.status(200).send(records);
    });
  },
};
