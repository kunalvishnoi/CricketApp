import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import CreateTeam from "./Pages/createTeam";
import Matches from "./Pages/matches";
import history from "./util/history.js";
import Index from "./Pages/dashboard";
import SideBar from "./Components/sidebar";
import PrivateRoute from "./Components/protectedroutes";
import { isMobile } from "./util/helpers";
import "bootstrap/dist/css/bootstrap.css";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const Root = () => (
  <Router history={history}>
    <SideBar isMobile={isMobile()} />
    <Switch>
      <Route path="/team" component={CreateTeam} />
      <Route path="/" exact={true} component={App} />
      <Route path="/matches" component={Matches} />
    </Switch>
  </Router>
);
ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
