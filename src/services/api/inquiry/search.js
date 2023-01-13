import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiInquirySearch = async (
  searchString,
  offset,
  fetchCount,
  isIncludeDone = true,
  isSearchIncludeContent = true,
  onSuccess,
  onFail,
) => {
  const url = '/inquiry/search';
  console.log(`${axios.defaults.baseURL}/inquiry/search`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const params = {
      offset: offset,
      fetchCount: fetchCount,
      isIncludeDone: isIncludeDone,
      searchString: searchString,
      isSearchIncludeContent: isSearchIncludeContent,
    };

    const data = {
      headers: {authorization: token},
      params: params,
    };

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      console.log(JSON.stringify(response.data.data, null, '\t'));
      onSuccess(offset, response.data.data, true);
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

export default apiInquirySearch;
