import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/reducers/userReducer";
import { withRouter } from "react-router";
import "./Nav.css";

const Nav = (props) => {
  const logout = () => {
    axios.get("/auth/logout").then((r) => {
      props.setUser(null);
      props.history.push("/auth");
    });
  };

  return (
    <div id="nav-wrapper" className="wFont">
      <Link className="no-decoration" to="/">
        <div>Vehicle Maintenance Log</div>
      </Link>
      <div onClick={logout} className="cursor">
        logout
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { setUser })(withRouter(Nav));
