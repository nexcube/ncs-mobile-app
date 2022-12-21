import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import userData from './src/services/DeviceStorage';

const callLoginAPI = async ({id, password}) => {
  axios
    .post('/login', JSON.stringify({id: id, password: password}), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async res => {
      userData.setId(id);
      userData.setPassword(password);
      console.log(JSON.stringify(res.data, null, '  '));
      userData.setJWT(res.data.token);
      userData.setUserData(res.data.userData);

      if (res.data.loginType === 'staff') {
        navigation.navigate('HO_MainStack');
      } else {
        navigation.navigate('BO_MainStack');
      }
    })
    .catch(error => {
      console.log(error);
      Toast.show({
        type: 'errorMsg',
        visibilityTime: 3000,
        props: {
          message:
            '아이디 혹은 비밀번호가 유효하지 않거나 앱 사용 권한이 없습니다. 관리자에게 문의하세요',
        },
      });
    });
};
