import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiCommonRegisterUserInfo = async (JWTToken, staffId, FCMToken, OS) => {
  const url = '/common/registerUserInfo';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const config = {
      headers: {authorization: `${JWTToken}`},
    };

    const response = await axios.put(url, {staffId: staffId, token: FCMToken, OS: OS}, config);

    if (response.data.code === 200) {
      // console.log(JSON.stringify(result, null, '\t'));
      return response.data.data;
    } else {
      console.error(response.data.message);
      return null;
    }
  } catch (error) {
    axios_error_handler(error);

    return null;
  }
};

export default apiCommonRegisterUserInfo;
