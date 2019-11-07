import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Cadastro extends Component{
    constructor(){
        super();
        this.state = {
            nome: 'teste',
            email: 'teste@1.com',
            senha: '123456',
            fotoPerfil: ''
        }
    }

    _irParaLogin = async () => {
        this.props.navigation.navigate('MainNavigator');
    }

    _cadastrar = async () => {
        await fetch('http://192.168.4.199:5000/api/Usuarios', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
                idPerfil : 2,
                fotoPerfil: this.state.fotoPerfil
            })
        })
        .then( res => res.json())
        .then( data =>  console.warn('Cadastrou e já te mando para o login'))
        .then( err => console.warn('Usuário Não Cadastrado ( dados incorretos ou já existentes)'))
    }

    render(){
        return (
            <View>
            <Text>Cadastro</Text>

            <View>
                <TextInput placeholder="Nome" value={this.state.nome} onChangeText={nome => this.setState({nome})} />
                <TextInput placeholder="Email" value={this.state.email} onChangeText={email => this.setState({email})} />
                <TextInput placeholder="Senha" value={this.state.senha} onChangeText={senha => this.setState({senha})} />
                <TextInput placeholder="Endereço de Imagem Perfil" value={this.state.fotoPerfil} onChangeText={fotoPerfil => this.setState({fotoPerfil})} />
            </View>

            <TouchableOpacity onPress={this._cadastrar} >
                <Text>Cadastrar</Text>
            </TouchableOpacity>
        </View>
        );
    }


}

const styles = StyleSheet.create({

});