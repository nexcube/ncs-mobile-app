import axios from 'axios';
import userData from '../DeviceStorage';
import axios_error_handling from './errorHandle';

const apiInquiryUpdate = async (params, onSuccess) => {
  console.log(`${axios.defaults.baseURL}/inquiry/update`);

  try {
    let url = '/inquiry/update';
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {headers: {'Content-Type': 'application/json', authorization: token}};

    const response = await axios.put(url, params, config);

    if (response.data.code === 200) {
      // console.log(response.data);
      onSuccess(response.data.data);
    } else {
      console.log(response.data.message);

      return null;
    }
  } catch (error) {
    axios_error_handling(error);

    return null;
  }
};

export default apiInquiryUpdate;
