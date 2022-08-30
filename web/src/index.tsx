import React from "react";
import ReactDOM from "react-dom";

import NaoEncontrado from "./pages/NotFound/index.js";
import Login from "./pages/Login/index.js";
import Home from "./pages/Home/index.js";
import DashboardAdmin from "./pages/Dashboard/index.js";
import Localizacoes from "./pages/Mapa/index.js";

import "./assets/css/global.style.css";

import { parseJwt } from "./services/autorizacao.js";

import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

const RotaPrivada = ({ component: Component }) => (
  <Route
    render={(props) =>
      localStorage.getItem("usuario-opflix") !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const PermissaoAdmin = ({ component: Component }) => (
  <Route
    render={(props) =>
      //Admin

      localStorage.getItem("usuario-opflix") !== null &&
      parseJwt().perm === "Admin" ? (
        <DashboardAdmin {...props} />
      ) : (
        <Route component={Login} />
      )
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <RotaPrivada path="/home" component={Home} />
        <RotaPrivada path="/localizacoes" component={Localizacoes} />
        <PermissaoAdmin path="/dashboard" component={DashboardAdmin} />
        <Route component={NaoEncontrado} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
