import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import SearchHeader from '../../../components/HeadOffice/Dashboard/Search/SearchHeader';
import ClassifyItem from '../../../components/HeadOffice/Setting/ClassifyItem';
import NoResult from '../../../components/NoResult';
import useInquiryList from '../../../hooks/useInquiryLIst';
import apiCategorySearch from '../../../services/api/category/search';
import apiCategorySearchByStaff from '../../../services/api/category/searchByStaff';
import apiCategorySearchByWatch from '../../../services/api/category/searchByWatch';
import {fetchCount} from '../../../services/config';

function HO_SettingClassify({navigation, route}) {
  const onClassifyDetail = () => navigation.navigate('HO_Classify_Detail');
  const [searchString, setSearchString] = useState('');
  const [searchIndex, setSearchIndex] = useState(0);
  const searchCategory = ['분류명', '담당자', '참관자'];

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

  const getData = offset => {
    switch (searchIndex) {
      case 0: // 분류명
        apiCategorySearch(offset, fetchCount, searchString, onSuccess);
        break;
      case 1: // 담당자
        apiCategorySearchByStaff(offset, fetchCount, searchString, onSuccess);
        // apiInquirySearch(searchString, offset, fetchCount, true, false, onSuccess, onFail);
        break;
      case 2: // 참관자
        apiCategorySearchByWatch(offset, fetchCount, searchString, onSuccess);
        // apiInquirySearch(searchString, offset, fetchCount, true, true, onSuccess, onFail);
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData(0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
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
    console.log(JSON.stringify(data, null, '\t'));

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

  const onSearchSubmit = async () => {
    resetStatus();
    getData(0);
  };

  const onRefresh = () => {
    setRefresh(true);
  };

  const onEndReached = () => {
    if (!status.loading && !status.noMore) {
      // console.log('onEndReached...');
      getData(status.offset);
    }
  };

  const onItemSelected = item => {
    const params = {
      item: item,
    };
    console.log(params);
    navigation.navigate('HO_Setting_Classify_Detail', params);
  };

  return (
    <View style={[styles.fullscreen]}>
      <SearchHeader
        title="분류 설정"
        searchCategory={searchCategory}
        searchPlaceHolder="분류명, 담당자, 참관자로 검색"
        searchString={searchString}
        setSearchString={setSearchString}
        searchIndex={searchIndex}
        setSearchIndex={setSearchIndex}
        onSearchSubmit={onSearchSubmit}
        isBackButton={true}
      />
      {list.length === 0 ? (
        <NoResult />
      ) : (
        <FlatList
          contentContainerStyle={[styles.list]}
          data={list}
          renderItem={({item, index}) => (
            <Pressable onPress={() => onItemSelected(item)}>
              <ClassifyItem
                key={index}
                title={item.qnaCatName}
                staffName={item.staffName}
                staffTeam={item.departName}
                staffPosition={item.dutyName}
                watcherCount={item.watcherCount}
                inquiryCount={item.inquiryCount}
                onSelect={() => onItemSelected(item)}
              />
            </Pressable>
          )}
          keyExtractor={(item, index) => index}
          scrollEventThrottle={200}
          onEndReachedThreshold={0.01}
          ItemSeparatorComponent={<View style={[styles.itemSeparator]} />}
          onEndReached={onEndReached}
          ListFooterComponent={
            status.loading && <ActivityIndicator size={'large'} color="0067CC" />
          }
          onRefresh={onRefresh}
          refreshing={status.isRefreshing}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
});

export default HO_SettingClassify;
