// BIBLIOTECAS
import React, { Component } from 'react';
import { Link } from "react-router-dom";


// COMPONENTES
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer.js';

export default class Mapa extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (

            <div>

                <h1 className="a"><Link to="/home" > Home </Link></h1>
                <main className="mainLoc">
                    <img src='https://httpstatusdogs.com/img/503.jpg' />
                </main>

            </div>
        )
    }
}

