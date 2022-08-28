import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class AlgumaPagina extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor="#631994" barStyle="light-content" />
                <Text> Page Default</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

})