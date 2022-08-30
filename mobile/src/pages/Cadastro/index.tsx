import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export default class Cadastro extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      senha: '',
      fotoPerfil:
        'https://abrilexame.files.wordpress.com/2018/10/capaprofile.jpg?quality=70&strip=info&resize=680,453',
      responseValue: '',
    };
  }

  _tratarResponse = res => {
    this.setState({responseValue: res.status});
  };

  _cadastrar = async () => {
    await fetch('http://192.168.4.199:5000/api/Usuarios', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha,
        idPerfil: 2,
        fotoPerfil: this.state.fotoPerfil,
      }),
    })
      .then(res => this._tratarResponse(res))
      .catch(err =>
        console.warn(
          'Usuário Não Cadastrado ( dados incorretos ou já existentes)',
        ),
      );

    if (this.state.responseValue == 200) {
      this.props.navigation.navigate('AuthStack');
    } else {
      console.warn(
        'Usuário Não Cadastrado ( dados incorretos ou já existentes',
      );
    }
  };

  _irParaLogin = () => {
    this.props.navigation.navigate('AuthStack');
  };

  render() {
    console.disableYellowBox = true;

    return (
      <View style={styles.divMae}>
        <TouchableOpacity onPress={this._irParaLogin}>
          <Image
            onPress={this._irParaLogin}
            style={styles.btnVoltar}
            source={require('../../assets/icons/ArrowBack.png')}
          />
        </TouchableOpacity>

        <View style={styles.divMae2}>
          <Text style={styles.h1}>Cadastro</Text>

          <View style={{marginBottom: 30}}>
            <TextInput
              placeholderTextColor="#fff"
              style={styles.input}
              placeholder="Nome"
              value={this.state.nome}
              onChangeText={nome => this.setState({nome})}
            />

            <TextInput
              placeholderTextColor="#fff"
              style={styles.input}
              placeholder="Email"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />

            <TextInput
              placeholderTextColor="#fff"
              secureTextEntry={true}
              style={styles.input}
              placeholder="Senha"
              value={this.state.senha}
              onChangeText={senha => this.setState({senha})}
            />

            <TextInput
              placeholderTextColor="#fff"
              style={styles.input}
              placeholder="Endereço de Imagem Perfil"
              value={this.state.fotoPerfil}
              onChangeText={fotoPerfil => this.setState({fotoPerfil})}
            />
          </View>

          <TouchableOpacity onPress={this._cadastrar}>
            <Text style={styles.btnCad}>Cadastrar</Text>
          </TouchableOpacity>
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
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 40,
    paddingTop: 30,
  },
  input: {
    color: 'white',
    fontSize: 17,
    borderStyle: 'solid',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    width: 380,
    marginBottom: 20,
  },
  btnCad: {
    color: '#fff',
    fontSize: 20,
    borderColor: '#631994',
    width: 250,
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: '#411061',
    textAlign: 'center',
    fontSize: 23,
    padding: 10,
    marginBottom: 20,
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
    marginLeft: 15,
  },
});
