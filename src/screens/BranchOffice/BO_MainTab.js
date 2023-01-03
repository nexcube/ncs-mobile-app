import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BO_Dashboard from './Dashboard/BO_Dashboard';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/globalStyles';
import BO_SettingStack from './Setting/BO_SettingStack';

const Tab = createBottomTabNavigator();

function BO_MainTab() {
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
        name="BO_Dashboard"
        component={BO_Dashboard}
        options={{
          title: '대시보드',
          headerShown: false,
          tabBarIcon: ({color, size}) => <Icon name="home" size={iconSize} color={color} />,
        }}
      />

      <Tab.Screen
        name="BO_SettingStack"
        component={BO_SettingStack}
        options={{
          title: '환경설정',
          headerTintColor: globalStyles.color.white,
          headerShown: false,
          tabBarIcon: ({color, size}) => <Icon name="settings" size={iconSize} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BO_MainTab;
