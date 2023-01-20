import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {useEffect, useState} from 'react';
import SearchHeader from '../../../components/HeadOffice/Dashboard/Search/SearchHeader';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import InquiryCard from '../../../components/BranchOffice/Dashboard/InquiryCard';
import useInquiryList from '../../../hooks/useInquiryLIst';
import {fetchCount} from '../../../services/config';
import {ActivityIndicator} from 'react-native-paper';
import apiInquirySearch from '../../../services/api/inquiry/search';
import apiInquirySearchByDepart from '../../../services/api/inquiry/searchByDepart';
import apiInquirySearchByCat from '../../../services/api/inquiry/searchByCat';
import NoResult from '../../../components/NoResult';
import apiInquirySearchByStaff from '../../../services/api/inquiry/searchByStaff';
import UserContext from '../../../services/context/UserContext';

function HO_Search({navigation, route}) {
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

  const [searchString, setSearchString] = useState('');
  const [searchIndex, setSearchIndex] = useState(0);
  //0:지점명, 1:제목, 2:제목&내용, 3:분류명, 4:담당자
  const searchCategory = ['지점명', '제목', '제목&내용', '분류명', '담당자'];
  const [User, , isHO] = useContext(UserContext);

  const getData = offset => {
    switch (searchIndex) {
      case 0: // 지점명
        apiInquirySearchByDepart(searchString, offset, fetchCount, onSuccess, onFail);
        break;
      case 1: // 제목
        apiInquirySearch(searchString, offset, fetchCount, true, false, onSuccess, onFail);
        break;
      case 2: // 제목&내용
        apiInquirySearch(searchString, offset, fetchCount, true, true, onSuccess, onFail);
        break;
      case 3: // 분류명
        apiInquirySearchByCat(searchString, offset, fetchCount, onSuccess, onFail);
        break;
      case 4: // 담당자
        apiInquirySearchByStaff(searchString, offset, fetchCount, onSuccess, onFail);
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
    // console.log(JSON.stringify(data, null, '\t'));

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
      getData(status.offset);
    }
  };

  const onSearchSubmit = async () => {
    resetStatus();
    getData(0);
  };

  const onRefresh = () => {
    setRefresh(true);
  };

  return (
    <View style={[styles.container]}>
      <SearchHeader
        title="검색"
        searchCategory={searchCategory}
        searchPlaceHolder="제목, 내용, 분류명, 지점명, 담당자로 검색"
        searchString={searchString}
        setSearchString={setSearchString}
        searchIndex={searchIndex}
        setSearchIndex={setSearchIndex}
        onSearchSubmit={onSearchSubmit}
      />
      {list.length === 0 ? (
        <NoResult />
      ) : (
        <FlatList
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
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  itemSeparator: {
    height: 14,
  },
});

export default HO_Search;
