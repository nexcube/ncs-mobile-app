import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BO_DashboardStack from './Dashboard/BO_DashboardStack';
import BO_SettingStack from './Setting/BO_SettingStack';

const Tab = createBottomTabNavigator();

function BO_MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerSBOwn: false,
        tabBarSBOwLabel: true,
        tabBarActiveTintColor: '#6200ee',
      }}>
      <Tab.Screen name="BO_DashboardStack" component={BO_DashboardStack} options={{headerShown: false}} />
      <Tab.Screen name="BO_SettingStack" component={BO_SettingStack} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}

export default BO_MainTab;
