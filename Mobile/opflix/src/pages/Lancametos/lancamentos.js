import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import jwtDecode from 'jwt-decode';


export default class Lancamentos extends Component {

    static navigationOptions = {
        header: null
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image source={require('../../assets/icons/iconL.png')} style={styles.icon} tintColor={tintColor} />
        )
    }

    constructor() {
        super();
        this.state = {
            token: '',
            tokenDecodado: '',
            lancamentosLs: [],
            categoriasLs: [],
            favoritosLs: [],
        }
    }

    componentDidMount() {
        this._listarLancamentos();
        this._listarCategorias();
        this._listarFavoritos();
    }


    _listarLancamentos = async () => {
        let token = await AsyncStorage.getItem('@opflix:token')

        await fetch('http://192.168.4.199:5000/api/Lancamentos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => this.setState({ lancamentosLs: data }))
        // .catch(x => console.warn('não vai listar os lancamentos'))


        // console.warn(this.state.token)
        // console.warn(this.state.lancamentosLs)
    }

    _listarCategorias = async () => {

        await fetch('http://192.168.4.199:5000/api/Categorias')
            .then(res => res.json())
            .then(data => this.setState({ categoriasLs: data }))
        // .catch(err => console.warn(err))
    }

    _listarFavoritos = async () => {
        let token = await AsyncStorage.getItem('@opflix:token')

        await fetch('http://192.168.4.199:5000/api/Lancamentos/favoritos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => this.setState({ favoritosLs: data }))
            .catch(x => console.warn('não vai listar os favoritos'))
    }

    _carregarViewNula = () => {
        return (
            <View style={{ width: 400, alignItems: 'center', textAlign: 'center' }}>
                {/* <Text style={styles.text}>Ainda não temos lançamentos dessa categoria</Text> */}
                <Image
                    style={styles.imgBreve}
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeRsFqBXRkF6UpvXa7pIYhvSSDMp971kcMz9GjkXTwXxg5rRjA&s' }}
                />
            </View>
        );
    }

    _carregarEscolhido = (item) => {
        this.props.navigation.navigate('EscolhidoStack');
    }


    render() {
        //console.warn("AAAAA" + this.state.favoritosLs);
        // console.warn(this.state.tokenDecodado)
        return (
            <View style={styles.divMae}>
                <ScrollView>

                    <View>
                        <Text style={styles.h1}> Favoritos </Text>

                        <FlatList
                            horizontal={true}
                            data={this.state.favoritosLs.idLancamentoNavigation}
                            ListEmptyComponent={this._carregarViewNula()}
                            keyExtractor={item => item.idLancamento}
                            key={item => item.idLancamento}
                            renderItem={
                                ({ item }) => (
                                    <TouchableOpacity
                                        onPress={this._carregarEscolhido} >
                                        <View>
                                            <Image
                                                style={styles.img}
                                                source={{ uri: item.fotoLanc }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        />
                    </View>


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
                                    key={item => item.titulo}
                                    ListEmptyComponent={this._carregarViewNula()}
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

                                                <TouchableOpacity
                                                    onPress={this._carregarEscolhido(item)} >
                                                    <Image
                                                        style={styles.img}
                                                        source={{ uri: item.fotoLanc }}
                                                    />
                                                </TouchableOpacity>
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
        flex: 1,
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
    imgBreve: {
        width: 350,
        height: 200,
        marginTop: 5,
        marginBottom: 5,
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    icon: {

        tintColor: '#fff',
        height: 35,
        width: 35,


    }

});