import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA = 'userData';
const JWT = 'jwt';

const deviceStorage = {
  async setItem(key, value) {
    try {
      const jsonString = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonString);
    } catch (error) {
      console.log('AsyncStorage Errors: ' + error.message);
    }
  },
  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      const jsonObject = JSON.parse(value);
      return jsonObject;
    } catch (error) {
      console.log('AsyncStorage Errors: ' + error.message);
    }
  },
};

const userData = {
  async setUserData(value) {
    await deviceStorage.setItem(USER_DATA, value);
  },

  async setToken(value) {
    await deviceStorage.setItem(JWT, value);
  },

  async getStaffId() {
    try {
      const data = await deviceStorage.getItem(USER_DATA);
      return data.staffId;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getJWT() {
    try {
      const data = await deviceStorage.getItem(JWT);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  },
};

export default userData;
