import {useEffect, useState} from 'react/cjs/react.development';
import userData from '../services/storage/DeviceStorage';

function useCustomSwitch(key) {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    userData.getItem(key).then(value => setIsOn(value));
  }, [key]);

  const onToggle = value => {
    userData.setItem(key, value).then(() => setIsOn(value));
  };

  return {isOn, onToggle};
}

export default useCustomSwitch;
