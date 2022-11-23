import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function LoginScreen({navigation, route}) {
  const onHO = function () {
    navigation.navigate('HO_MainTab');
  };
  const onBO = function () {
    navigation.navigate('BO_MainStack');
  };

  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>SignInScreen</Text>
      <View style={[styles.row]}>
        <Button title="Head Office" onPress={onHO} />
        <Button title="Branch Office" onPress={onBO} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoginScreen;
