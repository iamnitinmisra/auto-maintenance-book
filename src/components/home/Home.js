import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddVehicle from "../add/AddVehicle";
import Vehicle from "../vehicle/Vehicle";

function Home() {
  const [garageCars, setGarageCars] = useState([]);

  //get the user's fleet data
  useEffect(() => {
    axios.get("/garage").then((fleet) => {
      setGarageCars(fleet.data);
    });
  }, []);

  const createCar = async (e, newCar) => {
    e.preventDefault();
    const newFleet = await axios.post("/garage/add", newCar);
    // if the VIN isnt already apart of the db
    if (!newFleet.data.error) setGarageCars(newFleet.data);
    else console.error(newFleet.data.error);
  };

  // map over the garage and create the fleet list
  const Vehicles = garageCars.map((vehicle) => {
    return (
      <Link key={vehicle.id} to={`/maintenancelog/${vehicle.id}`}>
        <Vehicle vehicles={vehicle} />
      </Link>
    );
  });

  return (
    <div id="home-container">
      <AddVehicle createCar={createCar} />
      <div>Your Vehicle's</div>
      <div>{Vehicles}</div>
    </div>
  );
}

export default Home;
