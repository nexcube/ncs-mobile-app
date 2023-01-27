import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiCommonUpdateUserInfo = async (staffId, dayOfWeeks) => {
  const url = '/common/updateUserInfo';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {
      headers: {authorization: token},
    };

    const response = await axios.put(url, {staffId: staffId, dayOfWeeks: dayOfWeeks}, config);

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

export default apiCommonUpdateUserInfo;
