import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HO_Detail from './Detail/HO_Detail';
import HO_Dashboard from './HO_Dashboard';
import HO_DetailModify from './Detail/HO_DetailModify';
import HO_DetailImageViewer from './Detail/HO_DetailImageViewer';
import HO_DetailAddComment from './Detail/HO_DetailAddComment';
import {StyleSheet, View} from 'react-native';
import InquiryButton from '../Inquiry/InquiryButton';

const Stack = createNativeStackNavigator();

function HO_DashboardStack() {
  return (
    <>
      <View style={[styles.block]}>
        <Stack.Navigator>
          <Stack.Screen name="HO_Dashboard" component={HO_Dashboard} />
          <Stack.Screen name="HO_Detail" component={HO_Detail} />
          <Stack.Screen name="HO_Detail_Modify" component={HO_DetailModify} />
          <Stack.Screen name="HO_Detail_Image_Viewer" component={HO_DetailImageViewer} />
          <Stack.Screen name="HO_Detail_Add_Comment" component={HO_DetailAddComment} />
        </Stack.Navigator>
      </View>
      <InquiryButton />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});
export default HO_DashboardStack;
