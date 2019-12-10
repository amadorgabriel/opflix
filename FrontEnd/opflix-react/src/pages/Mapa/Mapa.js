// BIBLIOTECAS
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';

//CSS
import '../../assets/css/globalStyle.css';


// COMPONENTES
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer.js';
import Axios from 'axios';



export class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            listaLugares: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

        }
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });



    componentDidMount() {
        this.SetarLugares();
    }

    SetarLugares = async () => {
        await Axios.get('http://192.168.4.199:5000/api/Localizacoes'
        ).then(data => {
            this.setState({ listaLugares: data.data })
            console.log(this.state.listaLugares)
        })
    }


    render() {

        return (
            <div>
                <header style={styleHeader}>
                    <Navbar />
                </header>

                <main>

                    <Map
                        google={this.props.google}
                        style={style}
                        initialCenter={{
                            lat: -23.5364985,
                            lng: -46.6483357
                        }}
                        zoom={10}
                    >

                        {this.state.listaLugares.map(x => {

                            return (

                                <Marker
                                onMouseover={this.onMarkerClick}
                                    title={x.nome}
                                    name={x.nome}
                                    position={{ lat: x.latitude, lng: x.longitude }} />

                            );
                        })}

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div><p>{this.state.selectedPlace.name}</p></div>
                        </InfoWindow>


                    </Map>
                </main>

                <Footer style={styleFooter} />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    // GERADO POR MIM
    apiKey: ('AIzaSyBUL9qrQhlPD58oUD2D7-XMW7_yS2Us180'),
})(MapContainer)

const style = {
    marginTop: '1.5em',
    width: '100%',
    height: '90%',
}

const styleHeader = {
    marginTop: '3em',
}

const styleFooter = {
    paddingTop: '-2em'
}