module.exports = {
  dropdowns: async (req, res) => {
    const db = req.app.get("db");
    const workTypeOptions = await db.app.get_work_type();
    const partOptions = await db.app.get_part_options();
    let options = { workTypeOptions, partOptions };
    res.status(200).send(options);
  },
};
