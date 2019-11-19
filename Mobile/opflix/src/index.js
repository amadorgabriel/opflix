// PAGES
import LoginScreen from '../src/pages/Login/login';
import CadastroScreen from '../src/pages/Cadastro/cadastro';
import LancamentosScreen from '../src/pages/Lancametos/lancamentos'
import ProfileScreen from '../src/pages/Profile/profile'
import LancamentoEscolhidoScreen from '../src/pages/Lancametos/LancamentoEscolhido';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Alert, AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';



const AuthStack = createStackNavigator({
    Login: { screen: LoginScreen },
});

const CadastroStack = createStackNavigator({
    Cadastro: { screen: CadastroScreen }
});

const EscolhidoStack = createStackNavigator({
    LancamentoEscolhido:  {screen: LancamentoEscolhidoScreen}
});


const NavegadorPadrao = createBottomTabNavigator({
    Lancamentos: { screen: LancamentosScreen },
    ProfileScreen: { screen: ProfileScreen },
    // Logout: {
    //     screen: LogoutScreen   //  Empty screen, useless in this specific case
    //     , navigationOptions: ({ navigation }) => ({
    //         tabBarOnPress: (scene, jumpToIndex) => {
    //             return Alert.alert(   // Shows up the alert without redirecting anywhere
    //                 'Confirmation required'
    //                 , 'Do you really want to logout?'
    //                 , [
    //                     { text: 'Accept', onPress: () => this._deslogar() },
    //                     { text: 'Cancel' }
    //                 ]
    //             );
    //         },
    //     })
    // }
},
    {
        //inactive tint color
        initialRouteName: 'Lancamentos',
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: "#333222",
            inactiveBackgroundColor: "#222222",
            activeTintColor:'#fff',
            inactiveTintColor:'',
            style: {
                width: '100%',
                height: 50
            },
            labelStyle: {
                paddingBottom: 6,
                // fontWeigth: "bold",
                fontSize: 25,
            },
            tabStyle: {
                width: 100,
            }
        },
    },

)


// container
export default createAppContainer(
    createSwitchNavigator({
        NavegadorPadrao,
        AuthStack,
        CadastroStack,
        EscolhidoStack
    },
        {
            initialRouteName: 'AuthStack'
        }
    ));
