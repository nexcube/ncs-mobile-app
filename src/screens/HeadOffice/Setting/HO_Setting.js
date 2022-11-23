import React from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function HO_Setting({navigation, route}) {
  const onSettingPush = () => navigation.navigate('HO_Setting_Push');

  const onSettingClassify = () => navigation.navigate('HO_Setting_Classify');
  const onSettingClassifierChange = () => navigation.navigate('HO_Setting_Classifier_Change');
  const onSettingPushTime = () => navigation.navigate('HO_Setting_Push_Time');

  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>Head Office Setting</Text>
      <Button title="푸시알림" onPress={onSettingPush} />
      <Button title="분류설정" onPress={onSettingClassify} />
      <Button title="담당자 일괄변경" onPress={onSettingClassifierChange} />
      <Button title="알림시간대 변경" onPress={onSettingPushTime} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HO_Setting;
