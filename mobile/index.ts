/**
 * @format
 */

import {AppRegistry} from 'react-native';
import IndexNavigator from './src/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => IndexNavigator);