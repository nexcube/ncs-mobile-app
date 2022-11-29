import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Errors: ' + error.message);
    }
  },
  async readItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log('AsyncStorage Errors: ' + error.message);
    }
  },
};
export default deviceStorage;
