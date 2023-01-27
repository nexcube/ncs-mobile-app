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
import notifee, {EventType} from '@notifee/react-native';

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

//handle background event for when the notification is displayed in the background
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  if (type === EventType.ACTION_PRESS) {
    if (detail.pressAction.id === 'liked-workout') {
      //do some action
    }
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
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
