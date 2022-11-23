import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BO_MainTab from './BO_MainTab';
import BO_Detail from './Dashboard/Detail/BO_Detail';
import BO_DetailModify from './Dashboard/Detail/BO_DetailModify';
import BO_DetailImageViewer from './Dashboard/Detail/BO_DetailImageViewer';
import BO_DetailAddComment from './Dashboard/Detail/BO_DetailAddComment';
import BO_Inquiry from './Inquiry/BO_Inquiry';
import BO_InquiryClassify from './Inquiry/BO_InquiryClassify';
import BO_Setting from './Setting/BO_Setting';
import BO_SettingPush from './Setting/BO_SettingPush';
import BO_SettingUser from './Setting/BO_SettingUser';
import BO_SettingAddUser from './Setting/BO_SettingAddUser';

const Stack = createNativeStackNavigator();

function BO_MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BO_MainTab" component={BO_MainTab} />
      <Stack.Screen name="BO_Detail" component={BO_Detail} />
      <Stack.Screen name="BO_Detail_Modify" component={BO_DetailModify} />
      <Stack.Screen name="BO_Detail_Image_Viewer" component={BO_DetailImageViewer} />
      <Stack.Screen name="BO_Detail_Add_Comment" component={BO_DetailAddComment} />
      <Stack.Screen name="BO_Inquiry" component={BO_Inquiry} />
      <Stack.Screen name="BO_Inquiry_Classify" component={BO_InquiryClassify} />
      <Stack.Screen name="BO_Setting" component={BO_Setting} />
      <Stack.Screen name="BO_Setting_Push" component={BO_SettingPush} />
      <Stack.Screen name="BO_Setting_User_Setting" component={BO_SettingUser} />
      <Stack.Screen name="BO_Setting_Add_User" component={BO_SettingAddUser} />
    </Stack.Navigator>
  );
}

export default BO_MainStack;
