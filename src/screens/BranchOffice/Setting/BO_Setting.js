import React from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function BO_Setting({navigation, route}) {
  const onSettingPush = function () {
    navigation.navigate('BO_Setting_Push');
  };
  const onSettingUserSetting = function () {
    navigation.navigate('BO_Setting_User_Setting');
  };

  const onSettingAddUser = function () {
    navigation.navigate('BO_Setting_Add_User');
  };

  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>Branch Office Setting</Text>
      <Button title="푸시알림" onPress={onSettingPush} />
      <Button title="사용자설정" onPress={onSettingUserSetting} />
      <Button title="사용자추가" onPress={onSettingAddUser} />
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

export default BO_Setting;
