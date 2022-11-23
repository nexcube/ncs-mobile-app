import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HO_MainTab from './HO_MainTab';
import HO_Detail from './Dashboard/Detail/HO_Detail';
import HO_DetailImageViewer from './Dashboard/Detail/HO_DetailImageViewer';
import HO_DetailAddComment from './Dashboard/Detail/HO_DetailAddComment';
import HO_DetailClassifierInfo from './Dashboard/Detail/HO_DetailClassifierInfo';
import HO_DetailClassifierSearch from './Dashboard/Detail/HO_DetailClassifierSearch';
import HO_ClassifyDetail from './Dashboard/HO_ClassifyDetail';
import HO_Setting from './Setting/HO_Setting';
import HO_SettingClassify from './Setting/HO_SettingClassify';
import HO_SettingClassifierChange from './Setting/HO_SettingClassifierChange';
import HO_SettingPush from './Setting/HO_SettingPush';
import HO_SettingPushTime from './Setting/HO_SettingPushTime';

const Stack = createNativeStackNavigator();

function HO_MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HO_MainTab" component={HO_MainTab} />
      <Stack.Screen name="HO_Detail" component={HO_Detail} />
      <Stack.Screen name="HO_Detail_Image_Viewer" component={HO_DetailImageViewer} />
      <Stack.Screen name="HO_Detail_Add_Comment" component={HO_DetailAddComment} />
      <Stack.Screen name="HO_Detail_Classifier_Info" component={HO_DetailClassifierInfo} />
      <Stack.Screen name="HO_Detail_Classifier_Search" component={HO_DetailClassifierSearch} />
      <Stack.Screen name="HO_Classify_Detail" component={HO_ClassifyDetail} />
      <Stack.Screen name="HO_Setting" component={HO_Setting} />
      <Stack.Screen name="HO_Setting_Push" component={HO_SettingPush} />
      <Stack.Screen name="HO_Setting_Classify" component={HO_SettingClassify} />
      <Stack.Screen name="HO_Setting_Classifier_Change" component={HO_SettingClassifierChange} />
      <Stack.Screen name="HO_Setting_Push_Time" component={HO_SettingPushTime} />
    </Stack.Navigator>
  );
}

export default HO_MainStack;
