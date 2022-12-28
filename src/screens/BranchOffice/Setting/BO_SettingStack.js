import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BO_Setting from './BO_Setting';
import BO_SettingAddUser from './BO_SettingAddUser';
import BO_SettingPush from './BO_SettingPush';
import BO_SettingUser from './BO_SettingUser';
import globalStyles from '../../../styles/global';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator();

function BO_SettingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: globalStyles.color.white,
        headerStyle: {backgroundColor: globalStyles.color.purple},
        headerBackTitle: '',
        headerTitleAlign: 'center',
        headerBackImageSource:
          Platform.OS === 'android'
            ? require('../../../../assets/images/chevron-left.png')
            : {uri: 'back', width: 24, height: 24},
      }}>
      <Stack.Screen name="BO_Setting" component={BO_Setting} options={{title: '환경설정'}} />
      <Stack.Screen
        name="BO_Setting_Push"
        component={BO_SettingPush}
        options={{title: '푸시알림 설정'}}
      />
      <Stack.Screen
        name="BO_Setting_User_Setting"
        component={BO_SettingUser}
        options={{title: '사용자 설정'}}
      />
      <Stack.Screen
        name="BO_Setting_Add_User"
        component={BO_SettingAddUser}
        options={{title: '사용자 추가'}}
      />
    </Stack.Navigator>
  );
}

export default BO_SettingStack;
