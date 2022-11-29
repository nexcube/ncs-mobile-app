import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import RootStack from './src/screens/RootStack';
import axios from 'axios';
import Config from 'react-native-config';

function App() {
  axios.defaults.baseURL = Platform.select({
    ios: Config.SERVER_URL_IOS,
    android: Config.SERVER_URL_ANDROID,
  });
  return (
    <NavigationContainer>
      <StatusBar animated={true} hidden={false} />
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
