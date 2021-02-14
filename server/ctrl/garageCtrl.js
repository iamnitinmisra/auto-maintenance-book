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
      const cars = await db.garage.add_to_garage(VIN, id, make, model, year);
      res.status(201).send(cars);
    } catch (err) {
      if (err) {
        console.error(`${err.severity}: ${err.detail}`);
        return res.status(444).send(`${err.severity}: ${err.detail}`);
      }
    }
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
};
