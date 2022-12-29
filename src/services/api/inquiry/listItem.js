import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiInquiryListItem = async (index, onSuccess) => {
  const url = `/inquiry/list/${index}`;
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {headers: {authorization: token}};

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(JSON.stringify(response.data, null, '\t'));
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

export default apiInquiryListItem;
