import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet, AsyncStorage, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';



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
        // console.disableYellowBox = true;

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
            <View style={{ width: 400, alignItems: 'center', textAlign: 'center' }}
            >
                {/* <Text style={styles.text}>Ainda não temos lançamentos dessa categoria</Text> */}
                <TouchableOpacity
                    onPress={() => Alert.alert("Conteúdo vazio igual a essa tigela")}
                >
                    <Image
                        style={styles.imgBreve}
                        blurRadius={1}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeRsFqBXRkF6UpvXa7pIYhvSSDMp971kcMz9GjkXTwXxg5rRjA&s' }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    _navegar = async (titulo, sinopse, duracao, data, cat, foto, con, pValue, idL) => {
        try {
            await AsyncStorage.setItem('@opflix:lancTitulo', titulo);
            await AsyncStorage.setItem('@opflix:lancSinopse', sinopse);
            await AsyncStorage.setItem('@opflix:lancDuracao', duracao);
            await AsyncStorage.setItem('@opflix:lancData', data);
            await AsyncStorage.setItem('@opflix:lancFoto', foto);
            await AsyncStorage.setItem('@opflix:lancCategoria', cat);
            await AsyncStorage.setItem('@opflix:lancConteudo', con);
            await AsyncStorage.setItem('@opflix:idLanc', idL.toString());

            if (pValue == undefined) {
                //console.warn("un")
                await AsyncStorage.setItem('@opflix:boolFav', "false");

            } else {
                await AsyncStorage.setItem('@opflix:boolFav', "true");
            }

            // console.warn(await AsyncStorage.getItem('@opflix:lancamento'))
        } catch (error) {

        }
        finally {
            this.props.navigation.navigate('EscolhidoStack');
        }
    }

    render() {

        return (

            <View style={styles.divMae}>
                <ScrollView>

                    <Text style={styles.hMaster}> Lancamentos </Text>

                    <View style={styles.divCat}>
                        <Text style={styles.h1}> Favoritos </Text>
                        <FlatList
                            horizontal={true}
                            data={this.state.favoritosLs}
                            ListEmptyComponent={this._carregarViewNula()}
                            keyExtractor={item => item.idLancamento}
                            key={item => item.idLancamento}
                            renderItem={
                                ({ item }) => (
                                    <TouchableOpacity
                                        onPress={this._carregarEscolhido} >
                                        <View>

                                            <TouchableOpacity
                                                onPress={() => { this._navegar(item.idLancamentoNavigation.titulo, item.idLancamentoNavigation.sinopse, item.idLancamentoNavigation.duracao, item.idLancamentoNavigation.dataLancamento, item.idLancamentoNavigation.idCategoriaNavigation.nome, item.idLancamentoNavigation.fotoLanc, item.idLancamentoNavigation.idTipoConteudoNavigation.nome, item.titulo, item.idLancamento); }}
                                            >
                                                <Image
                                                    style={styles.img}
                                                    source={{ uri: item.idLancamentoNavigation.fotoLanc }}
                                                />
                                            </TouchableOpacity>

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
                            <View style={styles.divCat}>
                                <Text style={styles.h1}> {x.nome} </Text>

                                <FlatList
                                    horizontal={true}
                                    data={this.state.lancamentosLs.filter(y => { return y.idCategoria === idCat })}
                                    keyExtractor={item => item.idLancamento}
                                    key={item => item.titulo}
                                    ListEmptyComponent={this._carregarViewNula()}
                                    renderItem={
                                        ({ item }) => (
                                            <View >
                                                <TouchableOpacity
                                                    onPress={() => { this._navegar(item.titulo, item.sinopse, item.duracao, item.dataLancamento, item.idCategoriaNavigation.nome, item.fotoLanc, item.idTipoConteudoNavigation.nome, item.titulo, item.idLancamento); }}
                                                >
                                                    <Image
                                                        style={styles.img}
                                                        source={{ uri: item.fotoLanc }}
                                                    />
                                                </TouchableOpacity>

                                                {/* <Button
                                                    title={item.titulo}
                                                    color="#f194ff"
                                                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                                                /> */}
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
    hMaster: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        paddingBottom: 25,
        paddingTop: 25
    },
    divCat: {
        backgroundColor: '#363D45',
        marginBottom: 20,
        marginTop: 20,
        paddingBottom: 20,
        paddingTop: 5
    },
    h1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        paddingBottom: 25
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
        tintColor: '#631994',
        height: 35,
        width: 35,

    }

});