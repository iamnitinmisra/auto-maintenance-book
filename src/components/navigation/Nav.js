import axios from "axios";

import { useState } from "react";
import { withRouter } from "react-router";
// import { Redirect } from "react-router";

const Nav = (props) => {
  const logout = () => {
    axios.get("/auth/logout").then((r) => props.history.push("/auth"));
  };

  return (
    <div>
      <div onClick={logout}>logout</div>
    </div>
  );
};

export default withRouter(Nav);
