import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingButtons from '../../../components/common/Setting/SettingButtons';
import userData from '../../../services/storage/DeviceStorage';
import globalStyles from '../../../styles/globalStyles';
import {getVersion} from 'react-native-device-info';
import {VerticalSpace24} from '../../../components/common/VericalSpace';

function BO_Setting({navigation, route}) {
  const onPressPush = () => navigation.navigate('BO_Setting_Push');
  const onPressUserSetting = () => navigation.navigate('BO_Setting_User_Setting');
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

  const configPush = [
    {
      title: '푸시알림 설정',
      subTitle: '푸시알림 도착시 알림 방식을 설정합니다.',
      icon: 'bell',
      onPress: onPressPush,
    },
  ];

  const configUser = [
    {
      title: '사용자 설정',
      subTitle: '앱을 사용할 수 있는 구성원을 추가합니다.',
      icon: 'user-check',
      onPress: onPressUserSetting,
    },
  ];

  const configSystem = [
    {
      title: '로그아웃',
      subTitle: '',
      icon: 'log-out',
      onPress: onPressLogout,
    },
    {
      title: '앱 버전',
      subTitle: getVersion(),
      icon: 'log-out',
      onPress: () => null,
    },
  ];

  return (
    <ScrollView alwaysBounceVertical={false}>
      <View style={[styles.container]}>
        <Text style={[styles.subject]}>알림</Text>
        <SettingButtons settings={configPush} />
        <VerticalSpace24 />
        <Text style={[styles.subject]}>지점 환경</Text>
        <SettingButtons settings={configUser} />
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

export default BO_Setting;
