import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HO_Dashboard from './Dashboard/HO_Dashboard';
import HO_SharedInfo from './SharedInfo/HO_SharedInfo';
import HO_Search from './Search/HO_Search';
import HO_Setting from './Setting/HO_Setting';

const Tab = createBottomTabNavigator();
function HO_MainTab() {
  return (
    <>
      <View style={[styles.block]}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}>
          <Tab.Screen
            name="HO_Dashboard"
            component={HO_Dashboard}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />,
            }}
          />
          <Tab.Screen
            name="HO_SharedInfo"
            component={HO_SharedInfo}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => <Icon name="info" size={24} color={color} />,
            }}
          />
          <Tab.Screen
            name="HO_Search"
            component={HO_Search}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => <Icon name="search" size={24} color={color} />,
            }}
          />
          <Tab.Screen
            name="HO_Setting"
            component={HO_Setting}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => <Icon name="settings" size={24} color={color} />,
            }}
          />
        </Tab.Navigator>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});
export default HO_MainTab;
