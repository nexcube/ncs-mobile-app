import axios from 'axios';
import userData from '../DeviceStorage';
import axios_error_handling from './errorHandle';

const apiInquiryList = async (searchString, offset, fetchCount, onSuccess, onFail) => {
  console.log(`${axios.defaults.baseURL}/inquiry/list?offset=${offset}&fetchCount=${fetchCount}`);

  try {
    let url = '/inquiry/list';
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const params = {
      offset: offset,
      fetchCount: fetchCount,
    };
    const data = {
      headers: {authorization: token},
      params: params,
    };

    if (searchString?.length > 0) {
      params.searchString = searchString;
      params.offset = 0;
      url = '/inquiry/search';
    }

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(response.data);
      onSuccess(response.data.data, params.offset);
    } else {
      console.error(response.data.message);
      onFail();
      return null;
    }
  } catch (error) {
    axios_error_handling(error);
    onFail();
    return null;
  }
};

export default apiInquiryList;
