import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function BO_InquiryClassify({navigation, route}) {
  return (
    <View style={[styles.fullscreen]}>
      <Text>Branch Office Inquiry Classify</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BO_InquiryClassify;
