import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

const USER_DATA = 'userData';
const JWT = 'jwt';
const ID = 'id';
const PASSWORD = 'password';

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
  // 유저 로그인 정보
  async setUserData(value) {
    await deviceStorage.setItem(USER_DATA, value);
  },

  async getUserData() {
    const result = await deviceStorage.getItem(USER_DATA);
    return result;
  },

  async getStaffId() {
    const result = await deviceStorage.getItem(USER_DATA);
    return result.staffId;
  },

  // JWT
  async setJWT(value) {
    await deviceStorage.setItem(JWT, value);
  },

  async getJWT() {
    const result = await deviceStorage.getItem(JWT);
    return result;
  },

  // ID
  async setId(value) {
    await deviceStorage.setItem(ID, value);
  },

  async getId() {
    const result = await deviceStorage.getItem(ID);
    return result;
  },

  // PASSWORD
  async setPassword(value) {
    try {
      await EncryptedStorage.setItem(PASSWORD, value);
    } catch (error) {
      console.error(error);
    }
  },

  async getPassword() {
    try {
      const result = await EncryptedStorage.getItem(PASSWORD);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};

export default userData;
