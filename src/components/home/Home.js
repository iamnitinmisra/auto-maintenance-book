import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";
import Vehicle from "../vehicle/Vehicle";

function Home(props) {
  const { user, setUser, history } = props;

  const [garageCars, setGarageCars] = useState([]);

  //check to see if user is logged in on the server, and if so setup redux, if not push to auth page
  useEffect(() => {
    axios.get("/auth/session").then((user) => setUser(user.data));
    if (!user) history.push("/auth");
  }, []);

  //get the user's garage
  useEffect(() => {
    axios.get("/garage").then((fleet) => {
      setGarageCars(fleet.data);
    });
  }, []);

  console.log(garageCars);

  const Vehicles = garageCars.map((vehicle) => {
    return <Vehicle vehicles={vehicle} />;
  });

  return (
    <div id="home-container">
      <div>Your Vehicle's</div>
      <div>{Vehicles}</div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { setUser })(Home);
