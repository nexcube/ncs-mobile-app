import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View, Platform} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';
import EDUPLEXLogo from '../../assets/images/EDUPLEX-Logo.svg';
import LogoBack from '../../assets/images/EDUPLEX-Logo-back.svg';
import LinearGradient from 'react-native-linear-gradient';
import CustomToast, {Toast} from '../components/common/CustomToast';
import userData from '../services/storage/DeviceStorage';
import apiLogin from '../services/api/login';
import apiSettingQnaAccessUserListItem from '../services/api/setting/qnaAccessUser/listItem';
import UserContext from '../services/context/UserContext';
import apiResponsibilityList from '../services/api/setting/responsibilityList';
import apiAssignedRelatedCategoryWatchStaff from '../services/api/assigned/relatedCategoryWatchStaff';
import messaging from '@react-native-firebase/messaging';
import apiCommonRegisterUserInfo from '../services/api/common/registerUserInfo';

function LoginScreen({navigation, route}) {
  // 본사 직원: namhy00 / YAjPr5YLys
  // 지점 원장: schae / YAjPr5YLys
  const [id, setId] = useState('namhy00'); //
  const [password, setPassword] = useState('YAjPr5YLys');
  const [auto, setAuto] = useState(false);
  const [User, setUser] = useContext(UserContext);

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
    if (data.userData.rankCode === 'L10') {
      loginProcess(data, 'BO_MainStack');
    } else if (data.userData.departCode === 'EPXHEAD' || data.userData.departCode === 'CHBHEAD') {
      loginProcess(data, 'HO_MainStack');
    } else {
      apiSettingQnaAccessUserListItem(data.userData.staffId, data.userData.facilityCode).then(
        response => {
          if (response.length > 0) {
            loginProcess(data, 'BO_MainStack');
          } else {
            Toast.show({
              type: 'errorMsg',
              visibilityTime: 3000,
              props: {
                message:
                  '아이디 혹은 비밀번호가 유효하지 않거나 앱 사용 권한이 없습니다. 관리자에게 문의하세요',
              },
            });
          }
        },
      );
    }
  };

  async function onAppBootstrap(JWTToken, staffId) {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();

    // Save the token
    // await postToApi('/users/1234/tokens', {token});
    // console.log(token);

    await apiCommonRegisterUserInfo(
      JWTToken,
      staffId,
      token,
      Platform.select({ios: 'I', android: 'A'}),
    );
  }

  const loginProcess = (data, routesName) => {
    userData.setId(id);
    userData.setPassword(password);
    userData.setJWT(data.token);
    userData.setUserData(data.userData);
    onAppBootstrap(data.token, data.userData.staffId);

    if (routesName === 'HO_MainStack') {
      // 본사인 경우 미리 담당 카테코리 정보를 가져와서 셋팅 해준다.
      apiResponsibilityList().then(responsibilityList => {
        // console.log(responsibilityList);
        // const catIdx = responsibilityList.find(i => i.staffId === data.userData.staffId)?.catIndex;
        const assignedCatIdxs = responsibilityList
          .filter(i => i.staffId === data.userData.staffId)
          .map(j => j.catIndex);
        // console.log(catIdx);
        // console.log(assignedCatIdxs);
        //TODO 연관된 카테고리 정보도 추가하자.
        // 담당 카테고리가 없는 경우도 처리하자.
        apiAssignedRelatedCategoryWatchStaff(data.userData.staffId).then(catIdxs => {
          const newUser = {
            ...data.userData,
            assignedCatIdxs: assignedCatIdxs,
            relatedCatIdxs: catIdxs.map(v => v.catIdx),
          };
          setUser(newUser);
          // console.log(JSON.stringify(newUser, null, '\t'));
          navigation.navigate(routesName);
        });
      });
    } else {
      setUser(data.userData);
      navigation.navigate(routesName);
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
            onChangeText={value => setId(value.trim())}
          />
          <CustomInput
            hasMarginBottom
            returnKeyType="go"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="NEMS 암호"
            onChangeText={value => setPassword(value.trim())}
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
