import axios from 'axios';
import userData from '../../../storage/DeviceStorage';
import axios_error_handler from '../../errorHandler';

const apiSettingQnaAccessUserRegister = async (staffId, facilityCode, onSuccess) => {
  const url = '/setting/qnaAccessUser/register';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {
      headers: {'Content-Type': 'application/json', authorization: token},
    };

    const formData = {staffId: staffId, facilityCode: facilityCode};

    const response = await axios.post(url, formData, config);

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

export default apiSettingQnaAccessUserRegister;
