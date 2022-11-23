import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import BO_MainTab from './BranchOffice/BO_MainTab';
import HO_MainTab from './HeadOffice/HO_MainTab';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="HO_MainTab" component={HO_MainTab} options={{headerShown: false}} />
      <Stack.Screen name="BO_MainTab" component={BO_MainTab} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default RootStack;
