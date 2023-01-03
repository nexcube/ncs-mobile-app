import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, Platform, StatusBar} from 'react-native';
import RootStack from './src/screens/RootStack';
import axios from 'axios';

import globalStyles from './src/styles/globalStyles';
import {DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SpinnerContextProvider} from './src/services/context/SpinnerContext';

StatusBar.setBarStyle('light-content');
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  StatusBar.setTranslucent(true);
}

function App() {
  // TODO 나중에 제거 되어야 됨.
  LogBox.ignoreLogs([
    'Could not find image file:///Users/parkcom/Library/Developer/CoreSimulator/Devices/',
  ]);

  axios.defaults.baseURL = Platform.select({
    ios: 'http://192.168.0.37',
    android: 'http://192.168.0.37',

    // ios: 'http://3.39.59.30',
    // android: 'http://3.39.59.30',
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <SpinnerContextProvider>
          <RootStack />
        </SpinnerContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: globalStyles.color.white,
    text: globalStyles.color.text,
    background: '#f5f5f5',
  },
};
