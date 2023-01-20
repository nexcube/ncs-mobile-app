import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import InquiryCard from '../../../components/BranchOffice/Dashboard/InquiryCard';
import CustomSwitch from '../../../components/common/CustomSwitch';
import FlatListFooterLoading from '../../../components/common/FlatListFooterLoading';
import NoResult from '../../../components/NoResult';
import useCustomSwitch from '../../../hooks/useCustomSwitch';
import useInquiryList from '../../../hooks/useInquiryLIst';
import apiInquiryListShare from '../../../services/api/inquiry/listShare';
import {fetchCount} from '../../../services/config';
import UserContext from '../../../services/context/UserContext';

function HO_SharedInfo({navigation, route}) {
  const {isOn: isExceptDone, onToggle} = useCustomSwitch('isIncludeInprogress');
  const [, , isHO] = useContext(UserContext);
  const {
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
  } = useInquiryList();

  const listRef = useRef();

  const getData = offset => {
    apiInquiryListShare(offset, fetchCount, isExceptDone, onSuccess, onFail);
  };

  useFocusEffect(
    useCallback(() => {
      getData(0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExceptDone]),
  );

  // 리플레쉬일때 처리.
  useEffect(() => {
    if (status.isRefreshing) {
      // console.log('isRefreshing');
      getData(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.isRefreshing]);

  const onSuccess = (offset, data) => {
    // console.log(JSON.stringify(data, null, '\t'));
    setLoading(false);
    if (data.length === 0) {
      setNoMore(true);
      if (offset === 0) {
        setData([]);
      }
      return;
    }

    if (offset === 0) {
      setData(data);
    } else {
      addData(data);
    }
    increaseOffset(data.length);
  };

  const onFail = () => {
    setLoading(false);
  };

  const onItemSelected = item => {
    const params = {
      index: item.idx,
      fromHO: true,
    };
    // console.log(params);
    navigation.navigate('BO_Detail', params);
  };

  const onEndReached = () => {
    if (!status.loading && !status.noMore) {
      // console.log('onEndReached...');
      listRef.current.scrollToEnd();
      setLoading(true);
      getData(status.offset);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
  };

  return (
    <View style={[styles.container]}>
      {list.length === 0 ? (
        <NoResult />
      ) : (
        <FlatList
          ref={listRef}
          ListHeaderComponent={
            <View style={[styles.listHeader]}>
              <CustomSwitch text="진행중만 보기" value={isExceptDone} onValueChange={onToggle} />
            </View>
          }
          contentContainerStyle={[styles.list]}
          data={list}
          renderItem={({item, index}) => (
            <Pressable onPress={() => onItemSelected(item)}>
              <InquiryCard
                key={item.idx}
                title={item.title}
                // title={`count: ${index + 1} qnaIdx: ${item.idx} \n${item.title} `}
                mainCatName={item.mainCatName}
                subCatName={item.subCatName}
                branchOfficeName={item.branchOfficeName}
                inquirer={item.inquirer}
                levelName={item.levelName}
                updateDate={item.updateDate}
                status={item.status}
                isHO={isHO}
                commentCount={item?.commentCount ?? 0}
                assignedInfo={item?.assignedInfo}
                isRead={item.isRead !== null}
                // share={item?.share}
              />
            </Pressable>
          )}
          keyExtractor={item => item.idx}
          scrollEventThrottle={200}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={<View style={[styles.itemSeparator]} />}
          onEndReached={onEndReached}
          ListFooterComponent={status.loading && <FlatListFooterLoading />}
          onRefresh={onRefresh}
          refreshing={status.isRefreshing}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  list: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  itemSeparator: {
    height: 14,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  listHeader: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  overlay: {
    position: 'absolute',
    top: 100,

    left: 100,

    color: 'red',
  },
});

export default HO_SharedInfo;
