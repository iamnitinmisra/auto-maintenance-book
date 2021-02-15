require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { login, logout, register, getSession } = require("./ctrl/authCtrl");
const {
  allGarageCars,
  addToGarage,
  removeFromGarage,
  addVehicleRecord,
  vehicleRecords,
} = require("./ctrl/garageCtrl");
const { updateProfile } = require("./ctrl/userCtrl");

const app = express();

app.use(express.json());
// app.use(express.static(`${__dirname}/../build`));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

//authorization
app.post("/auth/login", login);
app.post("/auth/register", register);
app.get("/auth/session", getSession);
app.get("/auth/logout", logout);

//login required
app.get("/garage/", allGarageCars);
app.get("/garage/records", vehicleRecords);
app.post("/garage/add", addToGarage);
app.post("/garage/record", addVehicleRecord);
app.delete("/garage/remove", removeFromGarage);
app.put("/user/profile", updateProfile);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("Database connection established");
    app.listen(SERVER_PORT, () => {
      console.log(`Server is listening on port ${SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      error,
      "An error occurred while trying to establish a server. Please scroll up to view the error"
    );
  });
