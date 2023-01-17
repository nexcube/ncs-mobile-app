import React from 'react';
import {Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {Card} from 'react-native-paper';
import SettingButtons from '../../../components/common/Setting/SettingButtons';
import {VerticalSpace24} from '../../../components/common/VerticalSpace';
import userData from '../../../services/storage/DeviceStorage';
import globalStyles from '../../../styles/globalStyles';

function HO_Setting({navigation, route}) {
  const onPressPush = () => navigation.navigate('HO_Setting_Push');
  const onPressPushTime = () => navigation.navigate('HO_Setting_Push_Time');
  const onPressCategorySetting = () => navigation.navigate('HO_Setting_Classify');
  const onPressChangeAssigned = () => navigation.navigate('HO_Setting_Classifier_Change');
  const onPressLogout = () => {
    Alert.alert('주의', '정말로 로그아웃 하시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          userData.setId('');
          userData.setPassword('');
          userData.setJWT('');
          userData.setUserData('');
          navigation.popToTop();
        },
      },
    ]);
  };

  const configAlarm = [
    {
      title: '푸시알림 설정',
      subTitle: '푸시알림 도착시 알림 방식을 설정합니다.',
      icon: 'bell',
      onPress: onPressPush,
    },
    {
      title: '알림 시간대 설정',
      subTitle: '푸시알림을 수신할 시간대를 설정합니다.',
      icon: 'clock',
      onPress: onPressPushTime,
    },
  ];

  const configFunction = [
    {
      title: '분류 설정',
      subTitle: '문의 사항들의 분류 및 담당자를 설정합니다.',
      icon: 'user-check',
      onPress: onPressCategorySetting,
    },
    {
      title: '담당자 일괄 변경',
      subTitle:
        '특정 담당자에게 할당된 분류 및 참고인 정보를 다른 사람으로 일괄 변경합니다.(인수인계시 사용)',
      subtitleNumberOfLines: 5,
      icon: 'clock',
      onPress: onPressChangeAssigned,
    },
  ];

  const configSystem = [
    {
      title: '로그아웃',
      subTitle: '',
      icon: 'clock',
      onPress: onPressLogout,
    },
    {
      title: '앱버전',
      subTitle: getVersion(),
      icon: 'clock',
      onPress: () => null,
    },
  ];

  return (
    <ScrollView alwaysBounceVertical={false}>
      <View style={[styles.container]}>
        <Text style={[styles.subject]}>알림</Text>
        <SettingButtons settings={configAlarm} />
        <VerticalSpace24 />
        <Text style={[styles.subject]}>기능</Text>
        <SettingButtons settings={configFunction} />
        <VerticalSpace24 />
        <Text style={[styles.subject]}>시스템</Text>
        <SettingButtons settings={configSystem} />
        <VerticalSpace24 />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  subject: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    color: globalStyles.color.grayDark,
    margin: 10,
  },
});

export default HO_Setting;
