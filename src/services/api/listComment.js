import axios from 'axios';
import userData from '../DeviceStorage';
import axios_error_handling from './errorHandle';

const apiListComment = async (index, onSuccess) => {
  console.log(`${axios.defaults.baseURL}/inquiry/listComment`);

  try {
    let url = '/inquiry/listComment';
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {
      headers: {'Content-Type': 'application/json', authorization: token},
      params: {inquiryIndex: index},
    };

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(response.data);
      onSuccess(response.data.data);
    } else {
      console.error(response.data.message);
      return null;
    }
  } catch (error) {
    axios_error_handling(error);

    return null;
  }
};

export default apiListComment;
