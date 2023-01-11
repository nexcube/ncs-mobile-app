import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiAssignedRemoveCategoryWatchStaff = async (catIdx, watchStaffId, onSuccess) => {
  const url = '/assigned/removeCategoryWatchStaff';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {
      headers: {authorization: token},
    };

    const response = await axios.put(url, {catIdx: catIdx, watchStaffId: watchStaffId}, config);

    if (response.data.code === 200) {
      // console.log(response.data);
      onSuccess(response.data.data);
    } else {
      console.log(response.data.message);

      return null;
    }
  } catch (error) {
    axios_error_handler(error);

    return null;
  }
};

export default apiAssignedRemoveCategoryWatchStaff;
