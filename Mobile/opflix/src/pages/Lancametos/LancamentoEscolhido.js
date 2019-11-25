import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage, ScrollView, Alert } from 'react-native';
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
            foto: '',
            boolFav: '',
            idLanc: '',
        }
    }

    componentDidMount() {
        console.disableYellowBox = true;

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
        this.setState({ boolFav: await AsyncStorage.getItem('@opflix:boolFav') })
        this.setState({ idLanc: await AsyncStorage.getItem('@opflix:idLanc') })

         //console.warn("aaaaaaaaa" + await AsyncStorage.getItem('@opflix:idLanc'))
    }

    _voltarParaLancamentos = () => {
        this.props.navigation.navigate('NavegadorPadrao')
    }

    render() {

        return (
            <View style={styles.divMae} >
                <ScrollView >
                    <TouchableOpacity onPress={this._voltarParaLancamentos} >
                        <Image
                            onPress={this._voltarParaLancamentos}
                            style={styles.btnVoltar}
                            source={require('../../assets/icons/ArrowBack.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.lanc}>

                        <View style={styles.header}>
                            <View style={styles.maeTxt}>
                                <Text style={styles.h1}>{this.state.titulo}</Text>
                            </View>

                            {this.state.boolFav == "false" ? (
                                //Favorito
                                <Image source={require('../../assets/icons/completo.png')} style={styles.iconFav} />

                            ) : (
                                    //Favoritar
                                    <Image source={require('../../assets/icons/vazio.png')} style={styles.iconFav} />
                                    // <TouchableOpacity
                                    //     onPress={() => Alert.alert("Favoritado")
                                    //     }>

                                    // </TouchableOpacity>
                                )
                            }

                        </View>

                        <View style={styles.box1}>
                            <View>
                                <Image
                                    style={styles.img}
                                    source={{ uri: this.state.foto }}
                                />
                            </View>

                            <View style={styles.box1Txt}>
                                <Text style={styles.text}>Duração: {this.state.duracao} </Text>
                                <Text style={styles.text}>Data: {this.state.data} </Text>
                                <Text style={styles.text}>Categoria: {this.state.categoria} </Text>
                                <Text style={styles.text}>Conteudo: {this.state.conteudo} </Text>
                            </View>
                        </View>

                        <View style={styles.divMae2}>
                            <Text style={styles.text}>Sinopse:</Text>
                            <Text style={styles.text}>{this.state.sinopse} </Text>
                        </View>
                    </View>
                </ScrollView>

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
        marginTop: 25,
        display: "flex",
        justifyContent: "center",
        marginRight: 25,
        marginLeft: 25
    },
    maeTxt: {
        display: "flex",
        justifyContent: "center",
        maxWidth: 250
    },
    h1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 40,
        paddingTop: 10,
        paddingLeft: 30
    },
    text: {
        color: 'white',
        fontSize: 15,
        paddingBottom: 25,
        textAlign: "left",
        fontSize: 17
    },
    text2: {
        color: 'white',
        fontSize: 15,
        paddingBottom: 25,
        textAlign: "left",
        fontSize: 17
    },
    btnVoltar: {
        width: 40,
        height: 30,
        tintColor: '#fff',
        marginTop: 20,
        marginLeft: 15
    },
    img: {
        width: 160,
        height: 230,
        marginLeft: 5,
        marginRight: 25,

        borderWidth: 3,
        borderColor: '#fff',
    },
    lanc: {
        display: 'flex',
        justifyContent: 'center'
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 30
    },
    iconFav: {
        height: 60,
        width: 60,
        tintColor: "#631994",
        paddingTop: 10,
    },
    box1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    box1Txt: {
        alignSelf: "center"
    }
});
