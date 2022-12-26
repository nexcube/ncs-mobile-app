import axios from 'axios';
import userData from '../DeviceStorage';
import axios_error_handler from './errorHandler';

const apiDeleteFiles = async (tableName, index, files, onSuccess) => {
  console.log(`${axios.defaults.baseURL}/inquiry/deleteFiles`);

  try {
    let url = '/inquiry/deleteFiles';
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    const data = {
      headers: {authorization: token},

      data: {
        tableName: tableName,
        index: index,
        files: files,
      },
    };

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

export default apiDeleteFiles;
