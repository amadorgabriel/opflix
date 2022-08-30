import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../assets/css/globalStyle.css";

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <ul id="ulMenu">
          <div className="divLogo">
            <a href="#">
              <img
                src="https://fontmeme.com/permalink/191006/a6304700a0ff79b62a628296fdcbe966.png"
                alt="netflix-font"
                className="logo"
              />
            </a>
            <p>Lançamentos de Fimes e Séries</p>
          </div>

          <div className="divMenu">
            <li className="li">
              <Link to="/"> Login </Link>
            </li>
            <li className="liCadastro li">
              <Link to="/"> Cadastro </Link>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}
