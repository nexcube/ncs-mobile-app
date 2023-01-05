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

  const increaseOffset = count =>
    setStatus({...status, loading: false, isRefreshing: false, offset: status.offset + count});

  const setData = data => setList([...data]);
  const addData = data => setList([...list, ...data]);

  return {
    list,
    status,
    resetStatus,
    reset,
    setLoading,
    setNoMore,

    setRefresh,
    increaseOffset,
    setData,
    addData,
  };
}

export default useInquiryList;
