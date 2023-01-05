import {useState} from 'react';
import {stat} from 'react-native-fs';

function useInquiryList() {
  const initStatus = {
    offset: 0,
    loading: false,
    isRefreshing: false,
    noMore: false,
  };

  const [list, setList] = useState([]);
  const [status, setStatus] = useState(initStatus);

  const resetStatus = () => setStatus(initStatus);
  const reset = () => {
    resetStatus();
    setList([]);
  };

  const setLoading = isLoading => setStatus({...status, loading: isLoading});
  const setNoMore = isNoMore =>
    setStatus({...status, loading: false, isRefreshing: false, noMore: isNoMore});
  const setRefresh = isRefresh => setStatus({...initStatus, isRefreshing: isRefresh});
  const setNormal = () =>
    setStatus({...status, loading: false, isRefreshing: false, noMore: false});

  const increaseOffset = count => setStatus({...status, offset: status.offset + count});

  return {list, resetStatus, reset, setLoading, setNoMore, setNormal, setRefresh, increaseOffset};
}

export default useInquiryList;
