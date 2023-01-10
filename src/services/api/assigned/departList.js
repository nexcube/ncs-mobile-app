import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiAssignedDepartList = async onSuccess => {
  const url = '/assigned/departList';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {headers: {authorization: token}};
    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      onSuccess(response.data.data);
    } else {
      return null;
    }
  } catch (error) {
    axios_error_handler(error);

    return null;
  }
};

export default apiAssignedDepartList;
