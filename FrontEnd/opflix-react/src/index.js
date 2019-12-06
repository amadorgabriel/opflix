// BIBLIOTECAS
import React from 'react';
import ReactDOM from 'react-dom';

// PAGES
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado.js'
import Login from './pages/Login/Login.js';
import Home from './pages/Home/App.js';
import DashboardAdmin from './pages/Dashboard/Dashboard.js';
import Localizacoes from './pages/Mapa/Mapa.js';

import './index.css';
import * as serviceWorker from './serviceWorker';

// SERVICES
import { parseJwt } from './services/autorizacao.js';

// ROTAS 
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

// --------------------------------------------------------


const RotaPrivada = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem("usuario-opflix") !== null ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                )
        }
    />
)

const PermissaoAdmin = ({ component: Component }) => (
    <Route
        render={
            props =>
                //Admin

                localStorage.getItem("usuario-opflix") !== null && parseJwt().perm === "Admin" ? (
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
                <Route exact path='/' component={Login} />
                <RotaPrivada path='/home' component={Home} />
                <RotaPrivada path='/localizacoes' component={Localizacoes} />
                <PermissaoAdmin path='/dashboard' component={DashboardAdmin} />
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
