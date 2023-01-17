import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HO_Setting from './HO_Setting';

import HO_SettingPush from './HO_SettingPush';
import globalStyles from '../../../styles/globalStyles';
import {Platform} from 'react-native';
import HO_SettingClassify from './HO_SettingClassify';
import HO_SettingClassifierChange from './HO_SettingClassifierChange';
import HO_SettingPushTime from './HO_SettingPushTime';
import HO_SettingClassifyDetail from './HO_SettingClassifyDetail';

const Stack = createNativeStackNavigator();

function HO_SettingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: globalStyles.color.white,
        headerStyle: {backgroundColor: globalStyles.color.purple},
        headerBackTitle: '',
        headerTitleAlign: 'center',
        headerBackImageSource:
          Platform.OS === 'android'
            ? require('../../../../assets/images/chevron-left.png')
            : {uri: 'back', width: 24, height: 24},
      }}>
      <Stack.Screen name="HO_Setting" component={HO_Setting} options={{title: '환경설정'}} />
      <Stack.Screen
        name="HO_Setting_Push"
        component={HO_SettingPush}
        options={{title: '푸시알림 설정'}}
      />
      <Stack.Screen
        name="HO_Setting_Classify"
        component={HO_SettingClassify}
        options={{title: '분류 설정', headerShown: false}}
      />
      <Stack.Screen
        name="HO_Setting_Classify_Detail"
        component={HO_SettingClassifyDetail}
        options={{title: '분류 상세', headerShown: true}}
      />
      <Stack.Screen
        name="HO_Setting_Classifier_Change"
        component={HO_SettingClassifierChange}
        options={{title: '담당자 일괄변경'}}
      />
      <Stack.Screen
        name="HO_Setting_Push_Time"
        component={HO_SettingPushTime}
        options={{title: '알림시간대 변경'}}
      />
    </Stack.Navigator>
  );
}

export default HO_SettingStack;
