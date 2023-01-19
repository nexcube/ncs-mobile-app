import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiInquiryListItem = async (index, staffId, onSuccess) => {
  const url = `/inquiry/list/${index}/${staffId}`;
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {headers: {authorization: token}};

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // comment 가 없는 경우에 null 이므로 이후 처리가 편하게 0으로 셋팅
      if (response.data.data.commentCount === null) {
        response.data.data.commentCount = 0;
      }
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
