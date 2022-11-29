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
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

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
      .then(res => {
        console.log(res.status);
        console.log(res.data.token);
      })
      .catch(error => console.log(error));
  };

  // 전역 axios 기본값

  axios.defaults.baseURL = Platform.select({ios: 'http://localhost', android: 'http:/10.0.2.2'});

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
          />
          <TextInput
            placeholder="비밀번호를 입력하세요."
            style={[styles.input]}
            returnKeyType="go"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={setPassword}
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
