//Bibliotecas
import React, { Component } from 'react';
import { Link } from "react-router-dom";

// CSS
import '../assets/css/globalStyle.css';

export default class NavBar extends Component {

    Deslogar = () => {
        localStorage.clear();
        window.location.reload();
    }

    algumaCoisa = () => {
        var token = localStorage.getItem("usuario-opflix").split('.');
        var base64Url = token[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var tokenJSON = JSON.parse(window.atob(base64));
        var permToken = (tokenJSON.perm)

        console.log(permToken)

        if (permToken == 'Admin') {
            this.props.history.push('dashboard');
        } else {
            this.props.history.push('home');
        }
    }

    render() {
        return (
            <div className="nav navMargin">
                <ul id="ulMenu">
                    <div className="divLogo">
                        <a href="#"><img src="https://fontmeme.com/permalink/191006/a6304700a0ff79b62a628296fdcbe966.png" alt="netflix-font" className="logo" border="0" /></a>
                        <p>Lançamentos de Fimes e Séries</p>
                    </div>

                    <div className="divMenu">
                        <li className="li"><Link to="/home" > Home </Link></li>
                        {/* <li className="li"><Link to="/" > Login </Link></li> */}
                        {/* <!-- <li className="li"><a href="#">Dashboard</a></li> --> */}
                        {/* <li className="liCadastro li"><Link to="/" > Cadastro </Link></li> */}
                        <li className="li logout" onClick={this.Deslogar}> Deslogar </li>
                    </div>
                </ul>
            </div>
        )
    };


    // ████████████████████████████████████████
    // ███▓███████▓▓╬╬╬╬╬╬╬╬╬╬╬╬▓███▓▓▓▓█▓╬╬╬▓█
    // ███████▓█████▓▓╬╬╬╬╬╬╬╬▓███▓╬╬╬╬╬╬╬▓╬╬▓█
    // ████▓▓▓▓╬╬▓█████╬╬╬╬╬╬███▓╬╬╬╬╬╬╬╬╬╬╬╬╬█
    // ███▓▓▓▓╬╬╬╬╬╬▓██╬╬╬╬╬╬▓▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬▓█
    // ████▓▓▓╬╬╬╬╬╬╬▓█▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬▓█
    // ███▓█▓███████▓▓███▓╬╬╬╬╬╬▓███████▓╬╬╬╬▓█
    // ████████████████▓█▓╬╬╬╬╬▓▓▓▓▓▓▓▓╬╬╬╬╬╬╬█
    // ███▓▓▓▓▓▓▓╬╬▓▓▓▓▓█▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬▓█
    // ████▓▓▓╬╬╬╬▓▓▓▓▓▓█▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬▓█
    // ███▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬▓█
    // █████▓▓▓▓▓▓▓▓█▓▓▓█▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬▓█
    // █████▓▓▓▓▓▓▓██▓▓▓█▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬██
    // █████▓▓▓▓▓████▓▓▓█▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬██
    // ████▓█▓▓▓▓██▓▓▓▓██╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬██
    // ████▓▓███▓▓▓▓▓▓▓██▓╬╬╬╬╬╬╬╬╬╬╬╬█▓╬▓╬╬▓██
    // █████▓███▓▓▓▓▓▓▓▓████▓▓╬╬╬╬╬╬╬█▓╬╬╬╬╬▓██
    // █████▓▓█▓███▓▓▓████╬▓█▓▓╬╬╬▓▓█▓╬╬╬╬╬╬███
    // ██████▓██▓███████▓╬╬╬▓▓╬▓▓██▓╬╬╬╬╬╬╬▓███
    // ███████▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╬╬╬╬╬╬╬╬╬╬╬████
    // ███████▓▓██▓▓▓▓▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬▓████
    // ████████▓▓▓█████▓▓╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬▓█████
    // █████████▓▓▓█▓▓▓▓▓███▓╬╬╬╬╬╬╬╬╬╬╬▓██████
    // ██████████▓▓▓█▓▓▓╬▓██╬╬╬╬╬╬╬╬╬╬╬▓███████
    // ███████████▓▓█▓▓▓▓███▓╬╬╬╬╬╬╬╬╬▓████████
    // ██████████████▓▓▓███▓▓╬╬╬╬╬╬╬╬██████████
    // ███████████████▓▓▓██▓▓╬╬╬╬╬╬▓███████████

}