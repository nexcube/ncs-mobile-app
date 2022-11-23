import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function BO_SettingAddUser({navigation, route}) {
  return (
    <View style={[styles.fullscreen]}>
      <Text>Branch Office Setting Add User</Text>
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

export default BO_SettingAddUser;
