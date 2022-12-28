import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import BO_Dashboard from './Dashboard/BO_Dashboard';
import BO_Setting from './Setting/BO_Setting';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/global';
import userData from '../../services/DeviceStorage';
import axios from 'axios';
import {View} from 'react-native';
import BO_SettingStack from './Setting/BO_SettingStack';

const Tab = createBottomTabNavigator();

function BO_MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: globalStyles.color.white,
        tabBarInactiveBackgroundColor: globalStyles.color.white,
        tabBarActiveTintColor: globalStyles.color.blue,
        tabBarInactiveTintColor: globalStyles.color.gray,
      }}>
      <Tab.Screen
        name="BO_Dashboard"
        component={BO_Dashboard}
        options={{
          title: '대시보드',
          headerShown: false,
          tabBarIcon: ({color, size}) => <Icon name="home" size={24} color={color} />,
        }}
      />

      <Tab.Screen
        name="BO_SettingStack"
        component={BO_SettingStack}
        options={{
          title: '환경설정',
          headerTintColor: globalStyles.color.white,
          headerShown: false,
          tabBarIcon: ({color, size}) => <Icon name="settings" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BO_MainTab;
