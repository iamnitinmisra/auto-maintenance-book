module.exports = {
  updateProfile: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { firstName, lastName } = req.body;
    db.user
      .update_profile(id, firstName, lastName)
      .then((userProfile) => res.status(200).send(userProfile));
  },
};
