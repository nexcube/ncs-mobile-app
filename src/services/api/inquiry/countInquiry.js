import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiInquiryCountInquiry = async (
  staffId,
  assignedCatIdx,
  relatedCatIdxs,
  isIncludeDone,
  onSuccess,
  onFail,
) => {
  const url = '/inquiry/countInquiry';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const params = {
      staffId: staffId,
      assignedCatIdx: assignedCatIdx,
      relatedCatIdxs: relatedCatIdxs,
      isIncludeDone: isIncludeDone,
    };
    const data = {
      headers: {authorization: token},
      params: params,
    };

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(response.data);
      onSuccess(response.data.data);
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

export default apiInquiryCountInquiry;
