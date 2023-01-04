import {useState} from 'react/cjs/react.development';

function useBottomSheet(format) {
  const [config, setConfig] = useState({visible: false, format: format});

  const showBottomSheet = () => setConfig({...config, visible: true});

  const hideBottomSheet = () => setConfig({...config, visible: false});

  return [config, showBottomSheet, hideBottomSheet];
}

export default useBottomSheet;
