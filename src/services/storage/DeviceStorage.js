import EncryptedStorage from 'react-native-encrypted-storage';

export const USER_DATA = 'userData';
export const JWT = 'jwt';
export const ID = 'id';
export const PASSWORD = 'password';

const deviceStorage = {
  async setItem(key, value) {
    try {
      const jsonString = JSON.stringify(value);
      await EncryptedStorage.setItem(key, jsonString);
    } catch (error) {
      console.log('EncryptedStorage Errors: ' + error.message);
    }
  },
  async getItem(key) {
    try {
      const value = await EncryptedStorage.getItem(key);
      if (value === undefined) {
        return value;
      }
      const jsonObject = JSON.parse(value);
      return jsonObject;
    } catch (error) {
      console.log('EncryptedStorage Errors: ' + error.message);
    }
  },
};

const userData = {
  async setItem(key, value) {
    await deviceStorage.setItem(key, value);
  },
  async getItem(key) {
    const result = await deviceStorage.getItem(key);
    return result;
  },

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
    await deviceStorage.setItem(PASSWORD, value);
  },

  async getPassword() {
    const result = await deviceStorage.getItem(PASSWORD);
    return result;
  },
};

export default userData;
