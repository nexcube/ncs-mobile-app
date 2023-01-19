import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, FlatList, Pressable} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import InquiryCard from '../../../components/BranchOffice/Dashboard//InquiryCard';
import InquiryStatus from '../../../components/BranchOffice/Dashboard//inquiryStatus';
import SearchTextInput from '../../../components/BranchOffice/Dashboard//SearchTextInput';
import NoResult from '../../../components/NoResult';
import useInquiryList from '../../../hooks/useInquiryLIst';
import apiInquiryList from '../../../services/api/inquiry/list';
import apiInquirySearch from '../../../services/api/inquiry/search';
import {fetchCount} from '../../../services/config';
import UserContext from '../../../services/context/UserContext';

import globalStyles from '../../../styles/globalStyles';
import InquiryButton from '../Inquiry/InquiryButton';

function BO_Dashboard({navigation, route}) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const [User, ,] = useContext(UserContext);

  // 상태 //////////////////////////////////////////////////////////////////////////////////////////
  const [searchString, setSearchString] = useState('');

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

  //  API 처리 /////////////////////////////////////////////////////////////////////////////////////

  useFocusEffect(
    useCallback(() => {
      // setListStatus({...listStatus, offset: 0, noMore: false});
      reset();

      getInquiryList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    if (status.isRefreshing) {
      getInquiryList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.isRefreshing]);

  const getInquiryList = useCallback(
    async search => {
      if (status.loading || status.noMore) {
        return;
      }

      // setListStatus({...listStatus, loading: true});
      setLoading();
      if (search?.length > 0) {
        apiInquirySearch(search, 0, fetchCount, true, true, onSuccess, onFail);
      }
      apiInquiryList(search, status.offset, fetchCount, true, User.staffId, onSuccess, onFail);
    },
    [status.loading, status.noMore, status.offset, setLoading, User.staffId, onSuccess, onFail],
  );

  const onSuccess = useCallback(
    (offset, data, fromSearch = false) => {
      // console.log(JSON.stringify(data, null, '\t'));
      // 더이상 데이터가 없는가?
      if (data.length === 0) {
        setNoMore(true);
        if (offset === 0) {
          setData([]);
        }
        return;
      }

      if (offset === 0 || fromSearch) {
        setData(data);
      } else {
        addData(data);
      }

      increaseOffset(data.length);
    },
    [addData, increaseOffset, setData, setNoMore],
  );

  const onFail = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  // 이벤트 처리 ///////////////////////////////////////////////////////////////////////////////////
  // 스크롤 처리 ///////////////////////////////////////////////////////////////////////////////////
  const onEndReached = () => {
    if (!status.loading && !status.noMore) {
      getInquiryList();
    }
  };

  // 검색 이벤트 처리
  const onSearchSubmit = async () => {
    resetStatus();
    getInquiryList(searchString);
  };

  // 클릭 처리
  const onItemSelected = item => {
    const params = {
      index: item.idx,
    };
    // console.log(params);
    navigation.navigate('BO_Detail', params);
  };

  // 리플레쉬 이벤트
  const onRefresh = () => {
    setSearchString('');
    setRefresh(true);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    // <SafeAreaView style={[styles.container]} edges={['bottom']}>
    <View>
      <InquiryStatus animHeaderValue={scrollOffsetY} />
      <View style={[styles.searchArea]}>
        <SearchTextInput
          onSubmitEditing={onSearchSubmit}
          hasMarginBottom
          keyboardType="default"
          returnKeyType="search"
          autoCapitalize="none"
          placeholder="제목, 내용, 댓글, 담당자로 검색"
          value={searchString}
          onChangeText={setSearchString}
        />
      </View>

      {list.length === 0 ? (
        <NoResult />
      ) : (
        <FlatList
          contentContainerStyle={[styles.list]}
          data={list}
          renderItem={({item}) => (
            <Pressable onPress={() => onItemSelected(item)}>
              <InquiryCard
                key={item.idx}
                title={item.idx.toString() + ' : ' + item.title}
                mainCatName={item.mainCatName}
                subCatName={item.subCatName}
                branchOfficeName={item.branchOfficeName}
                inquirer={item.inquirer}
                levelName={item.levelName}
                updateDate={item.updateDate}
                status={item.status}
                commentCount={item?.commentCount ?? 0}
                isRead={item.isRead !== null}
              />
            </Pressable>
          )}
          keyExtractor={item => item.idx}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollOffsetY,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={200}
          ItemSeparatorComponent={<View style={[styles.itemSeparator]} />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            status.loading && <ActivityIndicator size={'large'} color="0067CC" />
          }
          onRefresh={onRefresh}
          refreshing={status.isRefreshing}
        />
      )}
      <InquiryButton routeName="BO_Inquiry" />
    </View>
    //  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchArea: {
    paddingHorizontal: 12,
    backgroundColor: globalStyles.color.purple,
    flexDirection: 'row',
  },

  list: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  itemSeparator: {
    height: 14,
  },
});

export default BO_Dashboard;
