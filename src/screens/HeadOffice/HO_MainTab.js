import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import HO_Dashboard from './HO_Dashboard';

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
          <Tab.Screen name="HO_Dashboard" component={HO_Dashboard} />
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
