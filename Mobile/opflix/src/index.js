// PAGES
import LoginScreen from '../pages/Login/login';
import CadastroScreen from '../pages/Cadastro/cadastro';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({
    Login: {screen: LoginScreen},
});

const MainNavigator = createBottomTabNavigator({
    Login: {screen: LoginScreen},
    Cadastro: {screen: CadastroScreen}
})


// container
export default createAppContainer(
    createSwitchNavigator({
        MainNavigator,
        AuthStack
    },
    {
        initialRouteName: 'AuthStack'
    }
));
