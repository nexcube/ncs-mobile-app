import {Alert, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const permissionList = [
  {target: '카메라', ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA},
];

const permissionCheck = target => {
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
    return;
  }

  const index = permissionList.findIndex(permission => permission.target === target);

  const platformPermission =
    Platform.OS === 'ios' ? permissionList[index].ios : permissionList[index].android;

  requestPermission(target, platformPermission);
};
const requestPermission = async (target, platformPermission) => {
  try {
    const result = await request(platformPermission);
    result === RESULTS.GRANTED
      ? console.log(`${target} 권한이 허용됨`)
      : console.log(`${target} 권한을 허용해주세요`);
  } catch (err) {
    Alert.alert(`${target} permission err`);
    console.warn(err);
  }
};

export {permissionCheck};
