import React from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function HO_Setting({navigation, route}) {
  const onSettingPush = function () {
    navigation.navigate('HO_Setting_Push');
  };
  const onSettingUser = function () {
    navigation.navigate('HO_Setting_User');
  };

  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>Head Office Setting</Text>
      <Button title="푸시알림" onPress={onSettingPush} />
      <Button title="사용자설정" onPress={onSettingUser} />
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
