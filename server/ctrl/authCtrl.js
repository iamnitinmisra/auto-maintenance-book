const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, pw } = req.body;

    const [existingUser] = await db.auth.login(email);
    if (!existingUser) {
      return res.status(403).send("Incorrect email or password");
    }
    const authenticated = bcrypt.compareSync(pw, existingUser.hash);
    if (!authenticated) {
      return res.status(403).send("Incorrect email or password");
    }
    delete existingUser.password_hash;
    delete existingUser.user_id;
    console.log("-> Login Detected <-");

    req.session.user = existingUser;

    res.status(200).send(req.session.user);
  },

  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, pw } = req.body;

    const [user] = await db.auth.check_user(email);
    if (user) {
      return res.status(409).send({ error: "User already exists" });
    }

    if (!pw) {
      return res.status(409).send({ error: "Enter a password" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pw, salt);
    const [newUser] = db.auth.register([email, hash]);
    console.log("** A NEW USER HAS SUCCESSFULLY SIGNED UP **");

    if (newUser) {
      return res.status(200).send({ success: "Registration Successful" });
    } else {
      return res.status(409).send({ error: "Something went wrong" });
    }
  },

  getSession: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(409).send({ error: "No user found" });
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    console.log("<- Logout Detected ->");
    res.status(200).send({ success: "Successfully logged out" });
  },
};
