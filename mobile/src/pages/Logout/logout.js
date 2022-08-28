import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';


export default class Logout extends Component {
    constructor(props) {
        super(props);
     }

    componentWillMount() {
        Asyncstorage.clear();
        this.props.navigation.navigate('AuthStack')
    }
}
