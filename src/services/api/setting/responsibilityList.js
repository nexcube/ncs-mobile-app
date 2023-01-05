import axios from 'axios';
import userData from '../../storage/DeviceStorage';
import axios_error_handler from '../errorHandler';

const apiResponsibilityList = async () => {
  const url = '/setting/responsibilityList';
  console.log(`${axios.defaults.baseURL}${url}`);

  try {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {
      headers: {'Content-Type': 'application/json', authorization: token},
    };

    const response = await axios.get(url, data);

    if (response.data.code === 200) {
      // console.log(JSON.stringify(response.data.data, null, '\t'));
      // const parent = response.data.data.filter(item => item.it_ParentQnaCatIdx === -1);
      // console.log(JSON.stringify(parent, null, '\t'));
      // const result = parent.map(item => ({
      //   ...item,
      //   child: response.data.data.filter(v => v.it_ParentQnaCatIdx === item.it_QnaCatIdx),
      // }));

      // console.log(JSON.stringify(result, null, '\t'));

      return response.data.data;
    } else {
      console.error(response.data.message);
      return null;
    }
  } catch (error) {
    axios_error_handler(error);

    return null;
  }
};

export default apiResponsibilityList;
