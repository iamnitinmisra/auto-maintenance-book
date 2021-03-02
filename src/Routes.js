import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Log from "./components/log/Log";
import Auth from "./components/login/Auth";
import Register from "./components/register/Register";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={Auth} />
    <Route path="/register" component={Register} />
    <Route path="/maintenancelog/:vin" component={Log} />
  </Switch>
);
