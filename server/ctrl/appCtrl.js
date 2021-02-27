module.exports = {
  dropdowns: (req, res) => {
    const db = req.app.get("db");
    db.app.dropdowns().then((options) => {
      return res.status(200).send(options);
    });
  },
};
