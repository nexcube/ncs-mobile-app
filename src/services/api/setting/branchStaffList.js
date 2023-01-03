import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiBranchStaffList = async branchCodes => {
  const url = '/setting/branchStaffList';
  console.log(`${axios.defaults.baseURL}${url}`);

  console.log(branchCodes);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {
      headers: {'Content-Type': 'application/json', authorization: token},
      params: {branchCodes: [...branchCodes]},
    };

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(JSON.stringify(response.data, null, '\t'));

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

export default apiBranchStaffList;
