import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';

import HO_MainStack from './HeadOffice/HO_MainStack';
import BO_MainStack from './BranchOffice/BO_MainStack';
import Spinner from 'react-native-loading-spinner-overlay';
import SpinnerContext from '../services/context/SpinnerContext';
import globalStyles from '../styles/global';

const Stack = createNativeStackNavigator();

function RootStack() {
  const [spinConfig] = useContext(SpinnerContext);

  return (
    <>
      <Spinner
        visible={spinConfig.visible}
        textContent={spinConfig.text}
        textStyle={globalStyles.spinnerTextStyle}
      />
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="HO_MainStack" component={HO_MainStack} options={{headerShown: false}} />
        <Stack.Screen name="BO_MainStack" component={BO_MainStack} options={{headerShown: false}} />
      </Stack.Navigator>
    </>
  );
}

export default RootStack;
