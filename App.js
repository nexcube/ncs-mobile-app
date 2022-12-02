import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Button, Platform, StatusBar, Text, TextInput} from 'react-native';
import RootStack from './src/screens/RootStack';
import axios from 'axios';
import Config from 'react-native-config';
import {setCustomText} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'Happiness-Sans-Regular',
  },
};

setCustomText(customTextProps);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: 'Happiness-Sans-Regular'};
Button.defaultProps = Button.defaultProps || {};
Button.defaultProps.style = {fontFamily: 'Happiness-Sans-Regular'};
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = {fontFamily: 'Happiness-Sans-Regular'};

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
