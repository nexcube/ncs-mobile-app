import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiCommentRegister = async (formData, onSuccess) => {
  const url = '/comment/register';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const config = {
      redirect: 'follow',
      headers: {'Content-Type': 'multipart/form-data', authorization: token},
      transformRequest: (data, headers) => {
        return data;
      },
    };

    const response = await axios.post(url, formData, config);

    if (response.data.code === 200) {
      // console.log(response.data);
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

export default apiCommentRegister;
