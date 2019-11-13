import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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
            tokenDecodado: '',
            nome: '',
            email: '',
            foto: ''
        }
    }

    componentDidMount (){
        this._setarValoresToken();
    }

    _setarValoresToken = async () => {
        try {
            const tokenSt = await AsyncStorage.getItem('@opflix:token')
            if (tokenSt != null) {
                this.setState({ token: tokenSt })
                this.setState({ tokenDecodado: jwt_decode(tokenSt) })
                this.setState({ nome: jwt_decode(tokenSt.nome) })
                this.setState({ email: jwt_decode(tokenSt).email })
                this.setState({ foto: jwt_decode(tokenSt).fotoLanc })

            }
        } catch{
            console.warn('Token Nulo')
        }
    } 


    render() {
        return (
            <View style={styles.divMae}>
                <StatusBar backgroundColor="#631994" barStyle="light-content" />
                <Text style={styles.h1}>Perfil User</Text>

                <Text>{this.state.nome}</Text>
                <Text>{this.state.email}</Text>
                <Text>{this.state.foto}</Text>

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
        width: 120,
        height: 200,
        marginLeft: 10,
        marginRight: 5
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    icon: {

        tintColor: '#fff',
        height: 35,
        width: 35
    }

})