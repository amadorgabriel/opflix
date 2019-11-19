import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class LEscolhido extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.state = {
            
        }
    }

    _voltarParaLancamentos = () => {
        this.props.navigation.navigate('NavegadorPadrao')
    }

    render() {
        return (
            <View style={styles.divMae}>

                <TouchableOpacity onPress={this._voltarParaLancamentos} >
                    <Image
                        onPress={this._voltarParaLancamentos}
                        style={styles.btnVoltar}
                        source={require('../../assets/icons/ArrowBack.png')}
                    />
                </TouchableOpacity>


                <Text style={styles.text}>{this.props.name}</Text>
                <Text style={styles.h1} name="AAAAA" >Lancamento Escolhido</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    divMae: {
        backgroundColor: '#2B3137',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 60
    },
    h1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        paddingBottom: 40
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    btnVoltar: {
        width: 40,
        height: 30,
        tintColor: '#fff',
    }
});
