import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";

function Home(props) {
  console.log(props);

  //check to see if user is logged in on the server, and if so setup redux, if not push to auth page
  const { user, setUser } = props;
  useEffect(() => {
    axios.get("/auth/session").then((user) => props.setUser(user.data));
    if (!user) props.history.push("/auth");
  }, [user]);

  return <div id="home-container">This is Home.js</div>;
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { setUser })(Home);
