import axios from 'axios';
import axios_error_handling from './errorHandler';

const apiLogin = async (id, password, onSuccess, onFail) => {
  console.log(`${axios.defaults.baseURL}/login`);
  try {
    const data = {id: id, password: password};
    const config = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.post('/login', data, config);

    if (response.data.code === 200) {
      onSuccess(response.data);
      // console.log(response.data);
    } else {
      console.log(response.data.message);
      onFail();
      return null;
    }
  } catch (error) {
    axios_error_handling(error);
    onFail();
    return null;
  }
};

export default apiLogin;
