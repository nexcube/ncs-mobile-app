import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Alert, LogBox, Platform, StatusBar} from 'react-native';
import RootStack from './src/screens/RootStack';
import axios from 'axios';

import globalStyles from './src/styles/globalStyles';
import {DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SpinnerContextProvider} from './src/services/context/SpinnerContext';
import {UserContextProvider} from './src/services/context/UserContext';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import userData from './src/services/storage/DeviceStorage';
import {pushTypeName} from './src/services/config';

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

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);

    return unsubscribe;
  }, []);

  async function onMessageReceived(message) {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(message));
    console.log('A new FCM message arrived!', JSON.stringify(message));

    // Request permissions (required for iOS)
    await notifee.requestPermission({sound: true, badge: true});

    let pushType = await userData.getItem(pushTypeName);
    pushType = pushType === null || pushType === undefined ? 'first' : pushType;
    console.log('pushType:', pushType);

    let vibration = true;
    let sound = true;
    switch (pushType) {
      case 'first':
        vibration = true;
        sound = true;
        break;
      case 'second':
        vibration = false;
        sound = true;
        break;
      case 'third':
        vibration = true;
        sound = false;
        break;
      case 'fourth':
        vibration = false;
        sound = false;
        break;
    }

    // Create a channel (required for Android)
    let channelId = null;
    if (sound) {
      channelId = await notifee.createChannel({
        id: pushType,
        name: 'Default Channel',
        vibration: vibration,
        sound: 'default',
      });
    } else {
      channelId = await notifee.createChannel({
        id: pushType,
        name: 'Default Channel',
        vibration: vibration,
      });
    }

    const {notification} = message;
    const {title, body} = notification;

    let notificationConfig = {};

    if (Platform.OS === 'android') {
      notificationConfig = {
        title,
        body,
        android: {
          channelId: channelId,
        },
      };
    } else {
      if (sound) {
        notificationConfig = {
          title,
          body,
          ios: {
            sound: 'default',
            vibration: vibration,
          },
        };
      } else {
        notificationConfig = {
          title,
          body,
          ios: {
            vibration: vibration,
          },
        };
      }
    }

    console.log(notificationConfig);
    notifee.displayNotification(notificationConfig);
  }

  messaging().setBackgroundMessageHandler(onMessageReceived);

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
          <UserContextProvider>
            <RootStack />
          </UserContextProvider>
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
