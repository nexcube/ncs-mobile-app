import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HO_Setting from './HO_Setting';
import HO_SettingPush from './HO_SettingPush';
import HO_SettingUser from './HO_SettingUserSetting';

const Stack = createNativeStackNavigator();

function HO_SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HO_Setting" component={HO_Setting} />
      <Stack.Screen name="HO_Setting_Push" component={HO_SettingPush} />
      <Stack.Screen name="HO_Setting_User" component={HO_SettingUser} />
    </Stack.Navigator>
  );
}

export default HO_SettingStack;
