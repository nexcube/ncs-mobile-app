import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiInquiryDeleteItem = async (index, onSuccess) => {
  const url = `/inquiry/deleteItem/${index}`;
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {headers: {authorization: token}};

    const response = await axios.delete(url, data);

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

export default apiInquiryDeleteItem;
