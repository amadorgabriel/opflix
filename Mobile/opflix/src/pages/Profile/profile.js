import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import jwt_decode from 'jwt-decode';


export default class AlgumaPagina extends Component {
    static navigationOptions = {
        header: null
    }

    static navigationOptions = {
        tabBarIcon: () => (
            <Image source={require('../../assets/icons/account.png')} style={styles.icon} />
        )
    }

    constructor() {
        super();
        this.state = {
            token: '',
            nomeR: null,
            emailR: null,
            fotoR: null,
            permissaoR: null
        }
    }

    componentDidMount() {
        this._setarValoresToken();
    }


    _setarValoresToken = async () => {
        try {
            const tokenSt = await AsyncStorage.getItem('@opflix:token')
            // const nome = await jwt_decode(tokenSt.nome);
            // const email = await jwt_decode(tokenSt.email);
            // const foto = await jwt_decode(tokenSt.foto);
            // const perm = await jwt_decode(tokenSt).perm;


            // console.warn(tokenSt)

            if (tokenSt != null) {
                this.setState({ token: tokenSt })

                this.setState({ nomeR: jwt_decode(tokenSt.nome) })
                // this.setState({ emailR: email })
                // this.setState({ fotoR: foto })
                // this.setState({ permissaoR: perm })

            }
        } catch{
             console.warn('Token Nulo')
        }

        this.render();
        // var tokenRec =  this.state.token;
        // console.warn ( jwt_decode(tokenRec).nome )
        // console.warn ( jwt_decode(tokenRec).email )
        // console.warn ( jwt_decode(tokenRec).foto )
    }


    render() {
        return (
            <View style={styles.divMae}>
                <StatusBar backgroundColor="#631994" barStyle="light-content" />
                <Text style={styles.h1}>Perfil</Text>
                

                <Text style={styles.text}>{this.state.nomeR}</Text>
                <Text style={styles.text}>{this.state.emailR}</Text>
                <Text style={styles.text}>{this.state.permissaoR}</Text>

                <Image
                    style={styles.img}
                    source={{ uri: this.state.fotoR }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    divMae: {
        backgroundColor: '#2B3137',
        height: 700,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    h1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        paddingBottom: 40
    },
    img: {
        height: 200,
        borderRadius: 120
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    icon: {

        tintColor: '#fff',
        height: 35,
        width: 35,

    }

})