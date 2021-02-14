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
    const cars = await db.garage.add_to_garage(VIN, id, make, model, year);
    if (!cars.length) {
      return res.status(444).send({
        error:
          "An unexpected error occured when trying to add your car to the garage",
      });
    }
    res.status(200).send(cars);
  },
  removeFromGarage: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { VIN } = req.body;
    db.garage
      .remove_from_garage(VIN, id)
      .then((response) => console.log(response));
  },
};
