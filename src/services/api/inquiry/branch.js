import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiInquiryBranch = async onSuccess => {
  const url = '/inquiry/branch';
  const staffId = await userData.getStaffId();
  console.log(`${axios.defaults.baseURL}${url}?id=${staffId}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {headers: {authorization: token}, params: {id: staffId}};
    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(response.data);
      onSuccess(response.data.data);
    } else {
      return null;
    }
  } catch (error) {
    axios_error_handler(error);

    return null;
  }
};

export default apiInquiryBranch;
