import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function LoginScreen({ navigation, route }) {
  const onHO = function () {
    navigation.navigate('HO_MainStack');
  };
  const onBO = function () {
    navigation.navigate('BO_MainStack');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.avoid}>

      <View style={[styles.fullscreen]}>
        <Text>SignInScreen</Text>
        <View style={[styles.row]}>
          <Button title="Head Office" onPress={onHO} />
          <Button title="Branch Office" onPress={onBO} />

        </View>
        <View>
          <Button title='test' />
          <Button title='test' />
          <Button title='test' />
          <Button title='test' />
          <Button title='test' />
          <Button title='test' />
          <TextInput placeholder='아이디를 입력하세요' style={[styles.input]}/>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  },
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
  input: {
    fontSize: 16,
    paddingVertical: 18
  },

  avoid: {
    flex: 1
  }

});

export default LoginScreen;
