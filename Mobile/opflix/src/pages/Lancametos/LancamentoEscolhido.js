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
            titulo: '',
            sinopse: '',
            duracao: '',
            data: '',
            categoria: '',
            conteudo: '',
            foto: ''
        }
    }

    componentDidMount() {
        this._carregarLancamento();
    }

    _carregarLancamento = async () => {

        //console.warn( await AsyncStorage.getItem('@opflix:lancFoto'));

        this.setState({ titulo: await AsyncStorage.getItem('@opflix:lancTitulo') })
        this.setState({ sinopse: await AsyncStorage.getItem('@opflix:lancSinopse') })
        this.setState({ duracao: await AsyncStorage.getItem('@opflix:lancDuracao') })
        this.setState({ data: await AsyncStorage.getItem('@opflix:lancData') })
        this.setState({ categoria: await AsyncStorage.getItem('@opflix:lancCategoria') })
        this.setState({ conteudo: await AsyncStorage.getItem('@opflix:lancConteudo') })
        this.setState({ foto: await AsyncStorage.getItem('@opflix:lancFoto') })

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

                <View style={styles.lanc}>

                    <Text style={styles.h1}>{this.state.titulo}</Text>
                    <Image
                        style={styles.img}
                        source={{ uri: this.state.foto }}
                    />

                    <View style={styles.divMae2}>
                        <Text style={styles.text}> {this.state.sinopse} </Text>
                        <Text style={styles.text}> {this.state.duracao} </Text>
                        <Text style={styles.text}> {this.state.data} </Text>
                        <Text style={styles.text}> {this.state.categoria} </Text>
                        <Text style={styles.text}> {this.state.conteudo} </Text>


                    </View>
                </View>

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
    },
    divMae2: {
        alignItems: 'center',
    },
    h1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
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
        marginTop: 20,
        marginLeft: 15
    },
    img: {
        width: 400,
        height: 220,
    },
    lanc: {
        display: 'flex',
        justifyContent: 'center'
    }
});
