import axios from 'axios';
import userData from '../DeviceStorage';
import axios_error_handling from './errorHandle';

const apiInquiryQnaCategory = async onSuccess => {
  console.log(`${axios.defaults.baseURL}/inquiry/qnaCategory`);

  try {
    let url = '/inquiry/qnaCategory';
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {
      headers: {authorization: token},
    };

    const response = await axios.get(url, data);

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

export default apiInquiryQnaCategory;
