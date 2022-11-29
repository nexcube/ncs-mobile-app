import React, {useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import axios from 'axios';
import deviceStorage from '../services/DeviceStorage';

function LoginScreen({navigation, route}) {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    axios
      .post('/login', JSON.stringify({email: email, password: password}), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async res => {
        await deviceStorage.saveItem('email', email);
        await deviceStorage.saveItem('password', password);
        await deviceStorage.saveItem('token', res.data.token);
        await deviceStorage.saveItem('role', res.data.role);

        if (res.data.role === '관리자') {
          navigation.navigate('HO_MainStack');
        } else {
          navigation.navigate('BO_MainStack');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      style={styles.avoid}>
      <View style={[styles.fullscreen]}>
        {mockupUI({navigation})}
        <View>
          <TextInput
            placeholder="이메일 입력하세요"
            style={[styles.input]}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            placeholder="비밀번호를 입력하세요."
            style={[styles.input]}
            returnKeyType="go"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
          />
          <Button title="로그인" onPress={onLogin} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
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
    paddingVertical: 18,
  },

  avoid: {
    flex: 1,
  },
});

function mockupUI({navigation}) {
  const onHO = () => navigation.navigate('HO_MainStack');
  const onBO = () => navigation.navigate('BO_MainStack');

  return (
    <>
      <Text>SignInScreen</Text>
      <View style={[styles.row]}>
        <Button title="Head Office" onPress={onHO} />
        <Button title="Branch Office" onPress={onBO} />
      </View>
    </>
  );
}

export default LoginScreen;
