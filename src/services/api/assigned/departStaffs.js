import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiAssignedDepartStaffs = async (departIdx, isIncludeRetire) => {
  const url = '/assigned/departStaffs';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {
      headers: {authorization: token},
      params: {id: departIdx, isIncludeRetire: isIncludeRetire},
    };
    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // onSuccess(response.data.data);
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    axios_error_handler(error);

    return null;
  }
};

export default apiAssignedDepartStaffs;
