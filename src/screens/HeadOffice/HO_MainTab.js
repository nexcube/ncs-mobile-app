import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HO_Dashboard from './Dashboard/HO_Dashboard';
import HO_SharedInfo from './SharedInfo/HO_SharedInfo';
import HO_Search from './Search/HO_Search';
import HO_Setting from './Setting/HO_Setting';
import globalStyles from '../../styles/globalStyles';
import HO_SettingStack from './Setting/HO_SettingStack';

const Tab = createBottomTabNavigator();
function HO_MainTab() {
  const iconSize = 24;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: globalStyles.color.white,
        tabBarInactiveBackgroundColor: globalStyles.color.white,
        tabBarActiveTintColor: globalStyles.color.blue,
        tabBarInactiveTintColor: globalStyles.color.gray,
      }}>
      <Tab.Screen
        name="HO_Dashboard"
        component={HO_Dashboard}
        options={{
          title: '대시보드',
          headerTintColor: globalStyles.color.white,
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="HO_SharedInfo"
        component={HO_SharedInfo}
        options={{
          title: '공유정보',
          headerShown: true,
          headerTintColor: globalStyles.color.white,
          headerStyle: {backgroundColor: globalStyles.color.purple},
          tabBarIcon: ({color}) => <Icon name="users" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="HO_Search"
        component={HO_Search}
        options={{
          title: '검색',
          headerTintColor: globalStyles.color.white,
          headerStyle: {backgroundColor: globalStyles.color.purple},
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="search" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="HO_SettingStack"
        component={HO_SettingStack}
        options={{
          title: '환경설정',
          headerTintColor: globalStyles.color.white,
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="settings" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default HO_MainTab;
