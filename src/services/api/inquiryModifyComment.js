import axios from 'axios';
import userData from '../DeviceStorage';
import axios_error_handler from './errorHandler';

const apiInquiryModifyComment = async (params, onSuccess) => {
  console.log(`${axios.defaults.baseURL}/inquiry/modifyComment`);

  try {
    let url = '/inquiry/modifyComment';
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {
      redirect: 'follow',
      headers: {'Content-Type': 'application/json', authorization: token},
      transformRequest: (data, headers) => {
        return data;
      },
    };

    const response = await axios.put(url, params, config);

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

export default apiInquiryModifyComment;
