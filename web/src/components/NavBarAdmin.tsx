import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../assets/css/globalStyle.css";

export default class NavBar extends Component {
  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

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
              <Link to="/dashboard"> Dashboard </Link>
            </li>
            <li className="li logout" onClick={this.handleLogout}>
              Deslogar
            </li>
          </div>
        </ul>
      </div>
    );
  }
}
