import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";
import Vehicle from "../vehicle/Vehicle";

function Home(props) {
  const { user, setUser, history } = props;

  const [garageCars, setGarageCars] = useState([]);

  //check to see if user is logged in on the server, and if so setup redux it
  useEffect(() => {
    axios.get("/auth/session").then((user) => {
      if (user.data) setUser(user.data);
    });
  }, [setUser]);

  //get the user's garage if they are logged in or push them to the login page if they are not
  useEffect(() => {
    if (user) {
      axios.get("/garage").then((fleet) => {
        setGarageCars(fleet.data);
      });
    } else {
      history.push("/auth");
    }
  }, [user, history]);

  const Vehicles = garageCars.map((vehicle) => {
    return <Vehicle vehicles={vehicle} key={vehicle.id} />;
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
