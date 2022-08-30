import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import jwt_decode from 'jwt-decode';

export default class Profile extends Component {
  static navigationOptions = {
    header: null,
  };

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/icons/account.png')}
        style={styles.icon}
        tintColor={tintColor}
      />
    ),
  };

  constructor() {
    super();
    this.state = {
      token: '',
      nomeR: null,
      emailR: null,
      fotoR:
        'https://abrilexame.files.wordpress.com/2018/10/capaprofile.jpg?quality=70&strip=info&resize=680,453',
      permissaoR: null,
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;

    this._setarValoresToken();
  }

  _deslogar = async () => {
    try {
      await AsyncStorage.removeItem('@opflix:token');
      this.props.navigation.navigate('AuthStack');
    } catch (error) {
      console.warn('AAAAAAAAh, Parece que nem foi');
    }
  };

  _setarValoresToken = async () => {
    const tokenSt = await AsyncStorage.getItem('@opflix:token');

    if (tokenSt != null) {
      this.setState({token: tokenSt});
      this.setState({fotoR: jwt_decode(tokenSt).foto});
      this.setState({nomeR: jwt_decode(tokenSt).nome});
      this.setState({emailR: jwt_decode(tokenSt).email});
      this.setState({permissaoR: jwt_decode(tokenSt).perm});
      //console.warn('Token' + tokenSt)
    }
  };

  render() {
    console.warn(this.state.fotoR);
    return (
      <View style={styles.divMae}>
        <StatusBar backgroundColor="#631994" barStyle=" light-content" />
        <Text style={styles.h1}>{this.state.nomeR}</Text>

        <Image style={styles.img} source={{uri: this.state.fotoR}} />

        <Text style={styles.textName} />
        <Text style={styles.text}>Email: {this.state.emailR}</Text>
        <Text style={styles.text}>Conta: {this.state.permissaoR}</Text>

        <TouchableOpacity onPress={this._deslogar}>
          <Text style={styles.btnCad}>Deslogar</Text>
        </TouchableOpacity>
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
    paddingTop: 35,
  },
  h1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 10,
  },
  img: {
    height: 200,
    width: 220,
    borderRadius: 180,
    marginBottom: 15,

    borderWidth: 3,
    borderColor: '#631994',
  },
  text: {
    color: 'whitesmoke',
    fontSize: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
    width: 350,
    marginBottom: 30,
    borderColor: 'whitesmoke',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    paddingBottom: 2,
  },
  icon: {
    tintColor: '#631994',
    height: 35,
    width: 35,
  },
  btnCad: {
    color: '#fff',
    fontSize: 20,
    borderColor: '#631994',
    width: 150,
    borderWidth: 3,
    borderRadius: 50,
    textAlign: 'center',
    fontSize: 23,
    padding: 6,
    marginTop: 20,
  },
});
