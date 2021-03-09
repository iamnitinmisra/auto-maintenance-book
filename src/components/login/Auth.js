import { useInput } from "../../Hooks";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/reducers/userReducer";
import axios from "axios";
import "./Auth.css";
import profileImage from "../../assets/miata-profile.png";

const Auth = (props) => {
  const [email, emailInput] = useInput({ type: "text", ph: "email" });
  const [pw, passInput] = useInput({ type: "password", ph: "password" });

  //check to see if user is logged in, if so push to home page
  useEffect(() => {
    if (props.user) props.history.push("/"); // change this to
  });

  const login = (e) => {
    e.preventDefault();
    const body = { email, pw };
    axios.post("/auth/login", body).then((user) => {
      props.setUser(user.data); //add the user to redux
      props.history.push("/");
    });
  };

  return (
    <div id="auth-container">
      <div className="main-title">
        <h1>VEHICLE</h1> <h1>MAINTENANCE</h1> <h1>LOG BOOK</h1>
        <h2>For all models and years</h2>
        <h2>cars/trucks/motorcycles</h2>
      </div>
      <div id="profile-image-container">
        <img id="profile-image" src={profileImage} alt="vehicle outline" />
      </div>
      <form id="auth-form" onSubmit={(e) => login(e)}>
        {emailInput}
        {passInput}
        <input type="submit" value="Login" />
      </form>
      <div id="register">
        <h3>{`Not a member? `}</h3>
        <Link to="/register">
          <div>Register</div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { setUser })(Auth);
