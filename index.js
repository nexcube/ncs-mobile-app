/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import React from 'react';
import theme from './src/theme/theme';
import messaging from '@react-native-firebase/messaging';

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message Handled in the background!', remoteMessage);
});

function HeadlessCheck({isHeadless}) {
  requestUserPermission();

  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <Main />;
}

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
