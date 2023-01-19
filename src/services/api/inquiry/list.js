import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiInquiryList = async (
  searchString,
  offset,
  fetchCount,
  isIncludeDone = true,
  staffId,
  onSuccess,
  onFail,
) => {
  console.log(`${axios.defaults.baseURL}/inquiry/list?offset=${offset}&fetchCount=${fetchCount}`);

  try {
    let url = '/inquiry/list';
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const params = {
      offset: offset,
      fetchCount: fetchCount,
      isIncludeDone: isIncludeDone,
      staffId: staffId,
    };
    const data = {
      headers: {authorization: token},
      params: params,
    };

    const fromSearch = searchString?.length > 0;

    if (fromSearch) {
      params.searchString = searchString;
      url = '/inquiry/search';
    }

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(JSON.stringify(response.data.data, null, '\t'));
      onSuccess(offset, response.data.data, fromSearch);
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

export default apiInquiryList;
