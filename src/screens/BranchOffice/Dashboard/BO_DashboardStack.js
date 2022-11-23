import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BO_Detail from './Detail/BO_Detail';
import BO_Dashboard from './BO_Dashboard';
import BO_DetailModify from './Detail/BO_DetailModify';
import BO_DetailImageViewer from './Detail/BO_DetailImageViewer';
import BO_DetailAddComment from './Detail/BO_DetailAddComment';
import {StyleSheet, View} from 'react-native';

import BO_Inquiry from '../Inquiry/BO_Inquiry';
import BO_InquiryClassify from '../Inquiry/BO_InquiryClassify';

const Stack = createNativeStackNavigator();

function BO_DashboardStack() {
  return (
    <>
      <View style={[styles.block]}>
        <Stack.Navigator>
          <Stack.Screen name="BO_Dashboard" component={BO_Dashboard} />
          <Stack.Screen name="BO_Detail" component={BO_Detail} />
          <Stack.Screen name="BO_Detail_Modify" component={BO_DetailModify} />
          <Stack.Screen name="BO_Detail_Image_Viewer" component={BO_DetailImageViewer} />
          <Stack.Screen name="BO_Detail_Add_Comment" component={BO_DetailAddComment} />
          <Stack.Screen name="BO_Inquiry" component={BO_Inquiry} />
          <Stack.Screen name="BO_Inquiry_Classify" component={BO_InquiryClassify} />
        </Stack.Navigator>
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
export default BO_DashboardStack;
