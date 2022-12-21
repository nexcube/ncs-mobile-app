import axios from 'axios';
import axios_error_handling from './errorHandle';

const login = async ({id, password, onSuccess, onError}) => {
  try {
    const data = {id: id, password: password};
    const config = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.post('/login', data, config);

    if (response.data.code === 200) {
      onSuccess(response.data);
    } else {
      console.log(response.data.message);
      onError();
      return null;
    }
  } catch (error) {
    axios_error_handling(error);
    onError();
    return null;
  }
};

export default login;
