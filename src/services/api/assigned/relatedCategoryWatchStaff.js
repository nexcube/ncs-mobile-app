import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiAssignedRelatedCategoryWatchStaff = async staffId => {
  const url = '/assigned/relatedCategoryWatchStaff';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {headers: {authorization: token}, params: {staffId: staffId}};

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      return response.data.data;
    } else {
      console.log(response.data.message);
      return null;
    }
  } catch (error) {
    axios_error_handler(error);
    return null;
  }
};

export default apiAssignedRelatedCategoryWatchStaff;
