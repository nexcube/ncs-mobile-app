import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiCommonGetUserInfo = async (staffId, onSuccess) => {
  const url = '/common/getUserInfo';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {
      headers: {'Content-Type': 'application/json', authorization: token},
      params: {staffId: staffId},
    };

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(JSON.stringify(response.data.data, null, '\t'));
      // return response.data.data;
      onSuccess(response.data.data);
    } else {
      console.error(response.data.message);
      return null;
    }
  } catch (error) {
    axios_error_handler(error);

    return null;
  }
};

export default apiCommonGetUserInfo;
