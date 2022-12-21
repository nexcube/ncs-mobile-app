import axios from 'axios';
import userData from '../DeviceStorage';
import axios_error_handling from './errorHandle';

const apiBranchList = async onSuccess => {
  const staffId = await userData.getStaffId();
  console.log(`${axios.defaults.baseURL}/inquiry/branchList?id=${staffId}`);

  try {
    const staffId = await userData.getStaffId();
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {headers: {authorization: token}, params: {id: staffId}};
    const response = await axios.get('/inquiry/branchList', data);

    if (response.data.code === 200) {
      // console.log(response.data);
      onSuccess(response.data.data);
    } else {
      console.log('dddd', response.data.message);
      return null;
    }
  } catch (error) {
    axios_error_handling(error);

    return null;
  }
};

export default apiBranchList;
