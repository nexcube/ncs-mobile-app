import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BO_MainTab from './BO_MainTab';
import BO_Detail from './Dashboard/Detail/BO_Detail';
import BO_DetailModify from './Dashboard/Detail/BO_DetailModify';
import BO_DetailImageViewer from './Dashboard/Detail/BO_DetailImageViewer';
import BO_DetailAddComment from './Dashboard/Detail/BO_DetailAddComment';
import BO_Inquiry from './Inquiry/BO_Inquiry';
import BO_InquiryClassify from './Inquiry/BO_InquiryClassify';
import globalStyles from '../../styles/global';
import {Platform} from 'react-native';
import BO_DetailModifyComment from './Dashboard/Detail/BO_DetailModifyComment';

const Stack = createNativeStackNavigator();

function BO_MainStack() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

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
      <Stack.Screen name="BO_MainTab" component={BO_MainTab} options={{headerShown: false}} />
      <Stack.Screen
        name="BO_Detail"
        component={BO_Detail}
        options={{title: '상세 보기', animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="BO_Detail_Modify"
        component={BO_DetailModify}
        options={{title: '수정하기'}}
      />
      <Stack.Screen
        name="BO_Detail_Image_Viewer"
        component={BO_DetailImageViewer}
        options={{title: '첨부된 이미지'}}
      />
      <Stack.Screen
        name="BO_Detail_Add_Comment"
        component={BO_DetailAddComment}
        options={{title: '댓글 작성'}}
      />
      <Stack.Screen name="BO_Inquiry" component={BO_Inquiry} options={{title: '문의하기'}} />
      <Stack.Screen
        name="BO_Inquiry_Classify"
        component={BO_InquiryClassify}
        options={{title: '분류 선택'}}
      />
      <Stack.Screen
        name="BO_Detail_Modify_Comment"
        component={BO_DetailModifyComment}
        options={{title: '댓글 수정'}}
      />
    </Stack.Navigator>
  );
}

export default BO_MainStack;
