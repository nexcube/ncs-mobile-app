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
import {
  alarmDayOfWeeksName,
  alarmEndIndexName,
  alarmStartIndexName,
  pushTypeName,
} from './src/services/config';
import apiCommonGetUserInfo from './src/services/api/common/getUserInfo';
import {current} from 'immer';

StatusBar.setBarStyle('light-content');
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  StatusBar.setTranslucent(true);
}

function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);
    initAlarmTime();

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function initAlarmTime() {
    const dayOfWeeks = await userData.getItem(alarmDayOfWeeksName);
    if (dayOfWeeks === null || dayOfWeeks === undefined) {
      const initDayOfWeeks = {
        월: true,
        화: true,
        수: true,
        목: true,
        금: true,
        토: true,
        일: true,
      };
      userData.setItem(alarmDayOfWeeksName, initDayOfWeeks);
    }

    const startTimeIndex = await userData.getItem(alarmStartIndexName);
    if (startTimeIndex === null || startTimeIndex === undefined) {
      userData.setItem(alarmStartIndexName, 0);
    }

    const endTimeIndex = await userData.getItem(alarmEndIndexName);
    if (endTimeIndex === null || endTimeIndex === undefined) {
      userData.setItem(alarmEndIndexName, 48);
    }
    console.log(dayOfWeeks, startTimeIndex, endTimeIndex);
  }

  async function onMessageReceived(message) {
    if (await isNotAlarmTime()) {
      return;
    }
    // console.log('A new FCM message arrived!', JSON.stringify(message));

    // Request permissions (required for iOS)
    await notifee.requestPermission({sound: true, badge: true});

    let pushType = await userData.getItem(pushTypeName);
    pushType = pushType === null || pushType === undefined ? 'first' : pushType;
    // console.log('pushType:', pushType);

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

    // console.log(notificationConfig);
    notifee.displayNotification(notificationConfig);
  }

  const isNotAlarmTime = async () => {
    const dayOfWeeks = await userData.getItem(alarmDayOfWeeksName);
    const startTimeIndex = await userData.getItem(alarmStartIndexName);
    const endTimeIndex = await userData.getItem(alarmEndIndexName);

    const day = new Date();
    const DOW = ['일', '월', '화', '수', '목', '금', '토'];

    if (dayOfWeeks[DOW[day.getDay()]] === false) {
      // console.log('is not Alarm Time');
      return true;
    }

    const hour = day.getHours();
    const minute = day.getMinutes();

    const currentTimeIndex = hour * 2 + Math.floor(minute / 30);
    // console.log(currentTimeIndex);

    if (startTimeIndex < currentTimeIndex && currentTimeIndex < endTimeIndex) {
      return false;
    }

    return true;
  };

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
