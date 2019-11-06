import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component{
    constructor(){
        super();
        this.state={
            email: null,
            senha: null
        }
    }

    render(){
        return(
            <View>
                <Text>Login</Text>

                <View>
                    <TextInput placeholder="Email" />
                    <TextInput placeholder="Senha" />
                </View>

                <TouchableOpacity>
                    <Text>Logar</Text>
                </TouchableOpacity>
            </View>
        );
    }
} 

const styles = StyleSheet.create({

});