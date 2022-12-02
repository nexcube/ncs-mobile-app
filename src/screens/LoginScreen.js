import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Image, View, Platform, StatusBar} from 'react-native';
import axios from 'axios';
import deviceStorage from '../services/DeviceStorage';

import CustomButton from '../components/CustomButton';
import BorderedInput from '../components/BorderedInput';

function LoginScreen({navigation, route}) {
  // 본사 직원: hk89131 / YAjPr5YLys
  // 지점 원장: schae / YAjPr5YLys

  const [id, setEmail] = useState('schae'); //
  const [password, setPassword] = useState('YAjPr5YLys');

  const onLogin = () => {
    axios
      .post('/login', JSON.stringify({id: id, password: password}), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async res => {
        await deviceStorage.saveItem('jwt', res.data.token);
        await deviceStorage.saveItem('userData', JSON.stringify(res.data.userData));

        console.log(res.data);
        if (res.data.loginType === 'staff') {
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
        <Image
          source={require('../../assets/images/EDUPLEX-Logo-back.png')}
          style={[styles.logoBack]}
        />

        <View style={[styles.logo]}>
          <Image source={require('../../assets/images/EDUPLEX-Logo.png')} />
        </View>
        <View style={[styles.input]}>
          <BorderedInput
            hasMarginBottom
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="NEMS 아이디"
            value={id}
            onChangeText={setEmail}
          />
          <BorderedInput
            hasMarginBottom
            returnKeyType="go"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="NEMS 암호"
            onChangeText={setPassword}
            value={password}
          />
          <CustomButton onPress={onLogin} title="로그인" hasMarginBottom={false} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#1E5CB3',
  },
  logo: {
    // backgroundColor: 'yellow',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBack: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  input: {
    // flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    fontSize: 17,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 6,
    marginVertical: 10,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#0067CC',
  },

  avoid: {
    flex: 1,
  },
});

export default LoginScreen;
