import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';

import HO_MainStack from './HeadOffice/HO_MainStack';
import BO_MainStack from './BranchOffice/BO_MainStack';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="HO_MainStack" component={HO_MainStack} options={{headerShown: false}} />
      <Stack.Screen name="BO_MainStack" component={BO_MainStack} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default RootStack;
