import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SettingBOList from '../../../components/setting/SettingBOList';

function BO_SettingAddUser({navigation, route}) {
  return (
    <View style={[styles.fullscreen]}>
      <SettingBOList
        BOList={[route.params.backOffice]}
        userList={[route.params.userList]}
        enableAddButton={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    paddingHorizontal: 18,
  },
});

export default BO_SettingAddUser;
