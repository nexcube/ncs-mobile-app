import axios from 'axios';
import userData from '../../../storage/DeviceStorage';
import axios_error_handler from '../../errorHandler';

const apiSettingQnaAccessUserList = async (facilityCodes, onSuccess) => {
  const url = '/setting/qnaAccessUser/list';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {
      headers: {'Content-Type': 'application/json', authorization: token},
      params: {facilityCodes: [...facilityCodes]},
    };

    const response = await axios.get(url, config);

    if (response.data.code === 200) {
      // console.log(JSON.stringify(response.data, null, '\t'));
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

export default apiSettingQnaAccessUserList;
