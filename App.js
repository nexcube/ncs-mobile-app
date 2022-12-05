import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import RootStack from './src/screens/RootStack';
import axios from 'axios';
import Config from 'react-native-config';

StatusBar.setBarStyle('light-content');
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  StatusBar.setTranslucent(true);
}

function App() {
  axios.defaults.baseURL = Platform.select({
    ios: Config.SERVER_URL_IOS,
    android: Config.SERVER_URL_ANDROID,
  });
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
