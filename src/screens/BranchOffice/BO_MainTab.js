import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BO_Dashboard from './BO_Dashboard';

const Tab = createBottomTabNavigator();
function BO_MainTab() {
  return (
    <>
      <View style={[styles.block]}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}>
          <Tab.Screen name="BO_Dashboard" component={BO_Dashboard} />
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
export default BO_MainTab;
