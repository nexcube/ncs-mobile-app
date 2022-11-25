import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import RootStack from './src/screens/RootStack';

function App() {
  return (
    <NavigationContainer>
      <StatusBar animated={true} hidden={false} />
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
