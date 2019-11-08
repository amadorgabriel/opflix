import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Cadastro extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            senha: '',
            fotoPerfil: '',

            responseValue: ""
        }
    }

    _tratarResponse = (res) => {
        this.setState({responseValue: res.status})
    }

    _cadastrar = async () => {
        await fetch('http://192.168.4.199:5000/api/Usuarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
                idPerfil: 2,
                fotoPerfil: this.state.fotoPerfil
            })
        })
            .then(res => this._tratarResponse(res))
            .catch(err => console.warn('Usuário Não Cadastrado ( dados incorretos ou já existentes)'))
  
            //console.warn(this.state.responseValue)
            if(this.state.responseValue == 200){
                this.props.navigation.navigate('AuthStack')
            }else{
                console.warn('Usuário Não Cadastrado ( dados incorretos ou já existentes');
            }
        }

    _irParaLogin = () => {
        this.props.navigation.navigate('AuthStack') 
    }

    render() {
        return (
            <View style={styles.divMae}>

                <Text style={styles.h1} >Cadastro</Text>

                <View  style={{marginBottom: 30}}>
                    <TextInput placeholderTextColor="#fff"  style={styles.input}  placeholder="Nome" value={this.state.nome} onChangeText={nome => this.setState({ nome })} />
                    <TextInput placeholderTextColor="#fff"  style={styles.input}  placeholder="Email" value={this.state.email} onChangeText={email => this.setState({ email })} />
                    <TextInput placeholderTextColor="#fff"  style={styles.input}  placeholder="Senha" value={this.state.senha} onChangeText={senha => this.setState({ senha })} />
                    <TextInput placeholderTextColor="#fff"  style={styles.input}  placeholder="Endereço de Imagem Perfil" value={this.state.fotoPerfil} onChangeText={fotoPerfil => this.setState({ fotoPerfil })} />
                </View>

                <TouchableOpacity onPress={this._cadastrar} >
                    <Text  style={styles.btnCad}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._irParaLogin} >
                    <Text style={styles.text}>Voltar</Text>
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
        paddingTop: 60
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
    btnCad:{
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