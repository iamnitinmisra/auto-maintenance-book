import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";
import { withRouter } from "react-router";

const Nav = (props) => {
  const logout = () => {
    axios.get("/auth/logout").then((r) => {
      props.setUser(null);
      props.history.push("/auth");
    });
  };

  return (
    <div>
      <div onClick={logout}>logout</div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { setUser })(withRouter(Nav));
