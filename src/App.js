import "./reset.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "./redux/reducers/userReducer";
import { withRouter } from "react-router";
import axios from "axios";
import routes from "./Routes";

function App(props) {
  const { user, setUser, history } = props;

  //check to see if user is logged in on the server, and if so setup redux, otherwise send them to Auth
  useEffect(() => {
    if (!user) {
      axios.get("/auth/session").then((user) => {
        if (user.data) setUser(user.data);
        else history.push("/auth");
      });
    }
  }, [setUser, history, user]);

  return <div className="App">{routes}</div>;
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { setUser })(withRouter(App));
