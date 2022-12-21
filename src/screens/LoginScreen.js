import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View, Platform} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';
import EDUPLEXLogo from '../../assets/images/EDUPLEX-Logo.svg';
import LogoBack from '../../assets/images/EDUPLEX-Logo-back.svg';
import LinearGradient from 'react-native-linear-gradient';
import CustomToast, {Toast} from '../components/common/CustomToast';
import userData from '../services/DeviceStorage';
import {useEffect} from 'react/cjs/react.development';
import apiLogin from '../services/api/login';

function LoginScreen({navigation, route}) {
  // 본사 직원: hk89131 / YAjPr5YLys
  // 지점 원장: schae / YAjPr5YLys
  const [id, setId] = useState('schae'); //
  const [password, setPassword] = useState('YAjPr5YLys');
  const [auto, setAuto] = useState(false);

  // 자동 로그인
  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    if (auto) {
      onLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  const autoLogin = async () => {
    const savedId = await userData.getId();
    const savedPassword = await userData.getPassword();
    if (savedId !== null && savedPassword !== null) {
      setId(savedId);
      setPassword(savedPassword);
      setAuto(true);
    }
  };

  // 로그인 처리
  const onLogin = async () => {
    Toast.hide();

    await apiLogin(id, password, onLoginSuccess, onLoginError);
  };

  const onLoginSuccess = data => {
    userData.setId(id);
    userData.setPassword(password);
    userData.setJWT(data.token);
    userData.setUserData(data.userData);

    if (data.loginType === 'staff') {
      navigation.navigate('HO_MainStack');
    } else {
      navigation.navigate('BO_MainStack');
    }
  };

  const onLoginError = () => {
    Toast.show({
      type: 'errorMsg',
      visibilityTime: 3000,
      props: {
        message:
          '아이디 혹은 비밀번호가 유효하지 않거나 앱 사용 권한이 없습니다. 관리자에게 문의하세요',
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      style={styles.avoid}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
        style={[styles.fullscreen]}>
        <LogoBack style={[styles.logoBack]} />
        <View style={[styles.logo]}>
          <EDUPLEXLogo />
        </View>
        <View style={[styles.input]}>
          <CustomInput
            hasMarginBottom
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="NEMS 아이디"
            value={id}
            onChangeText={setId}
          />
          <CustomInput
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
      </LinearGradient>
      <CustomToast />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'center',
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

  avoid: {
    flex: 1,
  },
});

export default LoginScreen;
