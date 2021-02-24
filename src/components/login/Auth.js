import { useInput } from "../../Hooks";
import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";
import "./Auth.css";

function Auth(props) {
  const [email, emailInput] = useInput({ type: "text", ph: "email" });
  const [pw, passInput] = useInput({ type: "text", ph: "password" });

  //check to see if user is logged in, if so push to home page
  useEffect(() => {
    if (props.user) props.history.push("/");
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
      <form id="auth-form" onSubmit={(e) => login(e)}>
        {emailInput}
        {passInput}
        <input type="submit" />
      </form>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { setUser })(Auth);
