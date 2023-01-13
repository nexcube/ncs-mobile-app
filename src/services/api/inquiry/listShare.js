import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiInquiryListShare = async (offset, fetchCount, isExceptDone = true, onSuccess, onFail) => {
  const url = '/inquiry/listShare';
  console.log(`${axios.defaults.baseURL}/inquiry${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const params = {
      offset: offset,
      fetchCount: fetchCount,
      isExceptDone: isExceptDone,
    };

    const data = {
      headers: {authorization: token},
      params: params,
    };

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(response.data);
      onSuccess(offset, response.data.data);
    } else {
      console.error(response.data.message);
      onFail();
      return null;
    }
  } catch (error) {
    axios_error_handler(error);
    onFail();
    return null;
  }
};

export default apiInquiryListShare;
