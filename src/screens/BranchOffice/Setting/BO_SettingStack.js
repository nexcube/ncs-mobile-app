import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BO_Setting from './BO_Setting';
import BO_SettingPush from './BO_SettingPush';
import BO_SettingUser from './BO_SettingUserSetting';

const Stack = createNativeStackNavigator();

function BO_SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BO_Setting" component={BO_Setting} />
      <Stack.Screen name="BO_Setting_Push" component={BO_SettingPush} />
      <Stack.Screen name="BO_Setting_User" component={BO_SettingUser} />
    </Stack.Navigator>
  );
}

export default BO_SettingStack;
