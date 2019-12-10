import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Mapa extends Component {
    static navigationOptions = {
        header: null
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image source={require('../../assets/icons/mapa.png')} style={styles.icon} tintColor={tintColor} />
        )
    }

    render() {
        return (
            <View>
                <Text>Maps</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    icon: {
        tintColor: '#631994',
        height: 35,
        width: 35,   
    },
})
