import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Log from "./components/log/Log";
import Auth from "./components/login/Auth";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={Auth} />
    <Route path="/maintenancelog/:id" component={Log} />
  </Switch>
);
