import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component{
    constructor(){
        super();
        this.state={
            email: 'erik@email.com',
            senha: '123456'
        }
    }

    _logar = async () => {
       await fetch('http://192.168.4.199:5000/api/Login',{
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
        .then( res => res.json() )

        //ALTERAR
        .then( data =>  console.warn('Aeeeeeeeee LOGADO ' + data.token) )
        .catch(erro => console.warn('Nao Logado'));
    }

    render(){
        return( 
            <View>
                <Text>Login</Text>

                <View>
                    <TextInput placeholder="Email" value={this.state.email} onChangeText={email => this.setState({email})} />
                    <TextInput placeholder="Senha" value={this.state.senha} onChangeText={senha => this.setState({senha})} />
                </View>

                <TouchableOpacity onPress={this._logar} >
                    <Text>Logar</Text>
                </TouchableOpacity>
            </View>
        );
    }
} 

const styles = StyleSheet.create({

});