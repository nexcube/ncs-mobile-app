import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HO_MainTab from './HO_MainTab';
import HO_Detail from './Dashboard/Detail/HO_Detail';
import HO_DetailImageViewer from './Dashboard/Detail/HO_DetailImageViewer';
import HO_DetailAddComment from './Dashboard/Detail/HO_DetailAddComment';
import HO_DetailAssignedInfo from './Dashboard/Detail/HO_DetailAssignedInfo';
import HO_DetailAssignedSearch from './Dashboard/Detail/HO_DetailAssignedSearch';
import HO_ClassifyDetail from './Dashboard/HO_ClassifyDetail';
import HO_Setting from './Setting/HO_Setting';
import HO_SettingClassify from './Setting/HO_SettingClassify';
import HO_SettingClassifierChange from './Setting/HO_SettingClassifierChange';
import HO_SettingPush from './Setting/HO_SettingPush';
import HO_SettingPushTime from './Setting/HO_SettingPushTime';
import globalStyles from '../../styles/globalStyles';
import {Platform} from 'react-native';
import BO_Detail from '../BranchOffice/Dashboard/Detail/BO_Detail';
import BO_DetailModify from '../BranchOffice/Dashboard/Detail/BO_DetailModify';
import BO_DetailAddComment from '../BranchOffice/Dashboard/Detail/BO_DetailAddComment';

const Stack = createNativeStackNavigator();

function HO_MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: globalStyles.color.white,
        headerStyle: {backgroundColor: globalStyles.color.purple},
        headerBackTitle: '',
        headerTitleAlign: 'center',
        headerBackImageSource:
          Platform.OS === 'android'
            ? require('../../../assets/images/chevron-left.png')
            : {uri: 'back', width: 24, height: 24},
        // presentation: 'modal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="HO_MainTab" component={HO_MainTab} options={{headerShown: false}} />
      <Stack.Screen
        name="BO_Detail"
        component={BO_Detail}
        options={{title: '상세 보기', animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="BO_Detail_Add_Comment"
        component={BO_DetailAddComment}
        options={{title: '댓글 작성'}}
      />
      <Stack.Screen
        name="BO_Detail_Modify"
        component={BO_DetailModify}
        options={{title: '수정하기'}}
      />
      <Stack.Screen
        name="HO_Detail_Image_Viewer"
        component={HO_DetailImageViewer}
        options={{title: '첨부된 이미지'}}
      />
      <Stack.Screen
        name="HO_Detail_Assigned_Info"
        component={HO_DetailAssignedInfo}
        options={{title: '처리 담당자 정보'}}
      />
      <Stack.Screen
        name="HO_Detail_Assigned_Search"
        component={HO_DetailAssignedSearch}
        options={{title: '담당자 검색'}}
        // options={{headerShown: false}}
      />
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
