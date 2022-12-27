import React from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingButton from '../../../components/setting/SettingButton';
import SettingButtonWithInfo from '../../../components/setting/SettingButtonWithInfo';
import globalStyles from '../../../styles/global';

function BO_Setting({navigation, route}) {
  // const onSettingPush = function () {
  //   navigation.navigate('BO_Setting_Push');
  // };
  // const onSettingUserSetting = function () {
  //   navigation.navigate('BO_Setting_User_Setting');
  // };

  // const onSettingAddUser = function () {
  //   navigation.navigate('BO_Setting_Add_User');
  // };

  const onPressPush = () => navigation.navigate('BO_Setting_Push');
  const onPressUserSetting = () => navigation.navigate('BO_Setting_User_Setting');
  const onPressLogout = () => console.log('구현 해야 됩니다.');

  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text style={[styles.subject]}>알림</Text>
      <SettingButton
        title="푸시알림 설정"
        subTitle="푸시알림 도착시 알림 방식을 설정합니다."
        icon="bell"
        onPress={onPressPush}
      />
      <Text style={[styles.subject]}>지점 환경</Text>
      <SettingButton
        title="사용자 설정"
        subTitle="앱을 사용할 수 있는 구성원을 추가합니다."
        icon="user-check"
        onPress={onPressUserSetting}
      />
      <Text style={[styles.subject]}>시스템</Text>
      <SettingButtonWithInfo
        title="로그아웃"
        info="푸시알림 도착시 알림 방식을 설정합니다."
        icon="log-out"
        onPress={onPressLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
  },
  subject: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    color: globalStyles.color.grayDark,
    margin: 10,
  },
});

export default BO_Setting;
