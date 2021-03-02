import axios from "axios";
import { useInput } from "../../Hooks";

const Register = (props) => {
  const [email, emailInput] = useInput({ type: "text", ph: "email" });
  const [pw, pwInput] = useInput({
    type: "password",
    ph: "password",
  });
  const [duplicate, duplicateInput] = useInput({
    type: "password",
    ph: "re-enter your password",
  });

  const register = (e) => {
    e.preventDefault();
    const newUser = { email, pw };
    console.log("register was pressed");
    axios.post("/auth/register", newUser).then((res) => {
      props.history.push("/auth");
    });
  };

  return (
    <form id="auth-form" onSubmit={register}>
      {emailInput}
      {pwInput}
      {duplicateInput}
      <input type="submit" />
    </form>
  );
};

export default Register;
