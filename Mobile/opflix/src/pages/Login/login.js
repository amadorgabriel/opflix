import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            mostrarAviso: '',
            //email: 'naruto@uzumaki@gmail.com',
            email: 'y@y.com',
            senha: '123456'
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
            .then(data => this._irParaLancamentos(data.token))
            .catch(erro => console.warn('Nao Logado'));
    }

    _irParaLancamentos = async (token) => {

        if (token != null) {
            try {
                await AsyncStorage.setItem('@opflix:token', token);
                this.state.mostrarAviso = "";
                this.props.navigation.navigate('NavegadorPadrao');
            } catch (err) { }
        }else{
            this.state.mostrarAviso = "Usuário ou senha inválido(as)";
            this.render();
        }
    }

    _irParaCadastro = () => {
        this.props.navigation.navigate('CadastroStack')
    }

    render() {
        return (
            <View style={styles.divMae}>
                <StatusBar backgroundColor="#631994" barStyle="light-content" />

                <Text style={styles.h1} >Login</Text>

                <View style={{ marginBottom: 30 }}>
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

                <Text style={styles.warning}> {this.state.mostrarAviso} </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    divMae: {
        backgroundColor: '#2B3137',
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 100
    },
    h1: {
        color: '#fff',
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
    btnLogar: {
        color: '#fff',
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
    },
    warning: {
        color: '#631fff',
        textAlign: "center",
        fontSize: 15,
        marginTop: 20
    }
});
