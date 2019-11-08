import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            email: '',
            senha: ''
        }
    }


    _logar = async () => {
        await fetch('http://192.168.4.199:5000/api/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            })
        })
            .then(res => res.json())

            //ALTERAR
            .then(data => console.warn('Aeeeeeeeee LOGADO ' + data.token))
            .catch(erro => console.warn('Nao Logado'));
    }

    _irParaCadastro = () => {
        this.props.navigation.navigate('CadastroStack')
    }

    render() {
        return (
            <View style={styles.divMae}>
                <StatusBar backgroundColor="#631994" barStyle="light-content" />

                <Text style={styles.h1} >Login</Text>

                <View style={{marginBottom: 30}}>
                    <TextInput style={styles.input} placeholderTextColor="#fff" placeholder="Email" value={this.state.email} onChangeText={email => this.setState({ email })} />
                    <TextInput style={styles.input} placeholderTextColor="#fff" placeholder="Senha" value={this.state.senha} onChangeText={senha => this.setState({ senha })} />
                </View>

                <TouchableOpacity onPress={this._logar} >
                    <Text style={styles.btnLogar}>Logar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._irParaCadastro}>
                    <Text style={styles.text} >Não tem uma conta?</Text>
                    <Text style={styles.text} >Cadastre-se!</Text>
                </TouchableOpacity>
            

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
        paddingTop: 100
    },
    h1: {
        color: '#631994',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        paddingBottom: 40
    },
    input: {
        color: 'white',
        fontSize: 17,
        borderStyle: 'solid',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        width: 380,
        marginBottom: 20
    },
    btnLogar:{
        color: '#631994',
        fontSize: 20,
        borderColor: '#631994',
        width: 150,
        borderWidth: 3,
        borderRadius: 50,
        textAlign: 'center',
        fontSize: 23,
        padding: 6,
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    }
});