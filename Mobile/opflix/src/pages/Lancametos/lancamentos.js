import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import jwt_decode from 'jwt-decode';


export default class Lancamentos extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            token: '',
            tokenDecodado: '',
            lancamentosLs: [],
            categoriasLs: [],
        }
    }

    componentDidMount() {
        this._setarDadosDoToken();
        this._listarCategorias();
    }


    _listarLancamentos = () => {
        fetch('http://192.168.4.199:5000/api/Lancamentos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
            .then(res => res.json())
            .then(data => this.setState({ lancamentosLs: data }))

        // console.warn(this.state.token)
        // console.warn(this.state.lancamentosLs)
    }

    _listarCategorias = () => {
        fetch('http://192.168.4.199:5000/api/Categorias')
            .then(res => res.json())
            .then(data => this.setState({ categoriasLs: data }))
            .catch(err => console.warn(err))
    }

    _setarDadosDoToken = async () => {
        try {
            const tokenSt = await AsyncStorage.getItem('@opflix:token')
            if (tokenSt != null) {
                this.setState({ token: tokenSt })
                this.setState({ tokenDecodado: jwt_decode(tokenSt) })
            }
        } catch{
            console.warn('Token Nulo')
        }
        //console.warn(this.state.tokenDecodado)

        this._listarLancamentos();
    }


    render() {
        return (

            <View style={styles.divMae}>
                <ScrollView>



                    {/* APENAS PARA AS CATEGORIAS DIFERENTES DE NULA OU UNDEFINED */}
                    {this.state.categoriasLs.map(x => {

                        var idCat = x.idCategoria
                        return (
                            <View>
                                <Text style={styles.h1}> {x.nome} </Text>

                                <FlatList
                                    horizontal={true}
                                    data={this.state.lancamentosLs.filter(y => { return y.idCategoria === idCat })}
                                    keyExtractor={item => item.idLancamento}
                                    renderItem={
                                        ({ item }) => (
                                            <View>
                                                {/* <Text>{item.titulo}</Text>
                                    <Text>{item.sinopse}</Text>
                                    <Text>{item.duracao}</Text>
                                    <Text>{item.dataLancamento}</Text>
                                    <Text>{item.idCategoriaNavigation != undefined ? item.idCategoriaNavigation.nome : 'nulo'}</Text>
                                    <Text>{item.idTipoConteudoNavigation != undefined ? item.idTipoConteudoNavigation.nome : 'nulo'}</Text>
                                <Text>{item.fotoLanc}</Text> */}

                                                <Image
                                                    style={styles.img}
                                                    source={{ uri: item.fotoLanc }}
                                                />
                                            </View>
                                        )
                                    }
                                />
                            </View>
                        );
                    })}

                 



                </ScrollView>

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

});