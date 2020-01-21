import React from "react";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import Index from "./Pages/dashboard";
import CreateTeam from "./Pages/createTeam";

import history from "./util/history.js";
import Admin from "./Pages/admin";
import SideBar from "./Components/sidebar";
import PrivateRoute from "./Components/protectedroutes";
import { isMobile } from "./util/helpers";
function App() {
  return <h1 className="sidebar-exit">Kunal</h1>;
}

export default App;
