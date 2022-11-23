import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

function BO_Inquiry() {
  const navigation = useNavigation();
  const onInquiryClassify = function () {
    navigation.navigate('BO_Inquiry_Classify');
  };
  return (
    <View style={[styles.fullscreen]}>
      <Text>Branch Office Inquiry</Text>
      <Button title="Branch Office Inquiry Classify" onPress={onInquiryClassify} />
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

export default BO_Inquiry;
