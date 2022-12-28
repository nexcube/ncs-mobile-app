import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SettingBOList from '../../../components/setting/SettingBOList';
import globalStyles from '../../../styles/global';

function BO_SettingUser({navigation, route}) {
  return (
    <View style={[styles.fullscreen]}>
      <View style={[styles.info]}>
        <Text style={[styles.infoText]}>
          에듀플렉스 소통앱은 기본적으로 지점 원장님 권한만 로그인 및 사용이 가능합니다. 그러나,
          특별한 이유로 다른 구성원이 소통앱 사용을 해야 할 필요가 있을 경우, 이곳에서 해당 구성원을
          추가하여 앱 사용권한을 부여할 수 있습니다.
        </Text>
      </View>
      <ScrollView>
        <SettingBOList
          BOList={['보라매점', '신도림점']}
          userList={[
            ['홍길동 원장', '홍길동 부원장'],
            ['홍길동 원장', '홍길동 부원장'],
          ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    paddingHorizontal: 18,
  },
  info: {
    paddingVertical: 24,
  },
  infoText: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    color: globalStyles.color.grayDark,
  },
});

export default BO_SettingUser;
