// PAGES
import LoginScreen from '../src/pages/Login/login';
import CadastroScreen from '../src/pages/Cadastro/cadastro';
import LancamentosScreen from '../src/pages/Lancametos/lancamentos'

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({
    Login: {screen: LoginScreen},
});

const CadastroStack = createStackNavigator({
    Cadastro: {screen: CadastroScreen}
});

const NavegadorPadrao = createBottomTabNavigator({
    Lancamentos: {screen: LancamentosScreen},
},
{
    initialRouteName: 'Lancamentos',
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: "#333777",
        inactiveBackgroundColor: "#333222",
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
        AuthStack ,
        CadastroStack 
    },
    {
        initialRouteName: 'AuthStack'
    }
));
