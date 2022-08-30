import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class Mapa extends Component {
  static navigationOptions = {
    header: null,
  };

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/icons/mapa.png')}
        style={styles.icon}
        tintColor={tintColor}
      />
    ),
  };

  render() {
    return (
      <View style={styles.divMae}>
        <Text style={styles.h1}>Maps</Text>

        <TouchableOpacity onPress={() => Alert.alert('Em desenvolvimento')}>
          <Image
            source={require('../../assets/icons/mapGif.gif')}
            style={styles.icon}
            tintColor={tintColor}
          />
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
  },
  icon: {
    tintColor: '#631994',
    height: 35,
    width: 35,
  },
  h1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 25,
  },
});
