import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BO_Dashboard from './Dashboard/BO_Dashboard';
import BO_Setting from './Setting/BO_Setting';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function BO_MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerSBOwn: false,
        tabBarSBOwLabel: true,
        tabBarActiveTintColor: '#6200ee',
      }}>
      <Tab.Screen
        name="BO_Dashboard"
        component={BO_Dashboard}
        options={{
          title: '대시보드',
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />,
        }}
      />

      <Tab.Screen
        name="BO_Setting"
        component={BO_Setting}
        options={{
          title: '환경설정',
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="settings" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BO_MainTab;
