import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiAssignedRegisterCategoryWatchStaff = async (
  catIdx,
  watchStaffId,
  makeStaffId,
  onSuccess,
) => {
  const url = '/assigned/registerCategoryWatchStaff';
  console.log(`${axios.defaults.baseURL}${url}`);

  const data = {
    catIdx: catIdx,
    watchStaffId: watchStaffId,
    makeStaffId: makeStaffId,
  };

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {
      headers: {authorization: token},
    };

    const response = await axios.post(url, data, config);

    if (response.data.code === 200) {
      onSuccess();
    } else {
      console.log(response.data.message);
      return null;
    }
  } catch (error) {
    axios_error_handler(error);
    return null;
  }
};

export default apiAssignedRegisterCategoryWatchStaff;
