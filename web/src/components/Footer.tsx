import React, { Component } from "react";

import "../assets/css/globalStyle.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div>
          <p>Contato FAQ: +55 (11) 2545-0459</p>
          <p>Todos direitos Reservados</p>
        </div>

        <img
          className="logo"
          src="https://fontmeme.com/permalink/191006/a6304700a0ff79b62a628296fdcbe966.png"
        />
      </div>
    );
  }
}
