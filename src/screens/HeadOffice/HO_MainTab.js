import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HO_DashboardStack from './Dashboard/HO_DashboardStack';
import HO_SettingStack from './Setting/HO_SettingStack';

const Tab = createBottomTabNavigator();

function HO_MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#6200ee',
      }}>
      <Tab.Screen name="HO_DashboardStack" component={HO_DashboardStack} />
      <Tab.Screen name="HO_SettingStack" component={HO_SettingStack} />
    </Tab.Navigator>
  );
}

export default HO_MainTab;
