import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiCategoryUpdateStaff = async (index, staffId, makeStaffId, onSuccess) => {
  const url = '/category/updateStaff';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {
      headers: {authorization: token},
    };

    const response = await axios.put(
      url,
      {index: index, staffId: staffId, makeStaffId: makeStaffId},
      config,
    );

    if (response.data.code === 200) {
      // console.log(response.data);
      // return response.data.data;
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

export default apiCategoryUpdateStaff;
