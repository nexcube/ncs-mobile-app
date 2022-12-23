import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, FlatList, Pressable} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';
import InquiryCard from '../../../components/Inquiry/InquiryCard';
import InquiryStatus from '../../../components/Inquiry/inquiryStatus';
import SearchTextInput from '../../../components/Inquiry/SearchTextInput';
import apiInquiryList from '../../../services/api/inquiryList';
import globalStyles from '../../../styles/global';
import InquiryButton from '../Inquiry/InquiryButton';

// 리스트 기본 갯수;
const fetchCount = 7;

function BO_Dashboard({navigation, route}) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  // Status ////////////////////////////////////////////////////////////////////////////////////////
  const [inquiryList, setInquiryList] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [listStatus, setListStatus] = useState({
    offset: 0,
    loading: false,
    isRefreshing: false,
    noMore: false,
  });

  useEffect(() => {
    console.log(`### Rendering #### -- list length: ${inquiryList.length}`);
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInquiryList();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    if (listStatus.isRefreshing) {
      getInquiryList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listStatus.isRefreshing]);

  const getInquiryList = async search => {
    if (listStatus.loading || listStatus.noMore) {
      return;
    }

    setListStatus({...listStatus, loading: true});
    if (search?.length > 0) {
      apiInquiryList(search, 0, fetchCount, onSuccess, onFail);
    }
    apiInquiryList(search, listStatus.offset, fetchCount, onSuccess, onFail);
  };

  const onSuccess = (data, fromSearch = false) => {
    console.log('onSuccess ~~~');
    // console.log(JSON.stringify(data, null, '\t'));
    // 더이상 데이터가 없는가?
    if (data.length === 0) {
      setListStatus({...listStatus, loading: false, isRefreshing: false, noMore: true});
      return;
    }

    if (listStatus.offset === 0 || fromSearch) {
      setInquiryList([...data]);
    } else {
      setInquiryList([...inquiryList, ...data]);
    }

    setListStatus({
      ...listStatus,
      loading: false,
      isRefreshing: false,
      offset: fromSearch ? 0 : listStatus.offset + data.length,
    });
  };

  const onFail = () => {
    setListStatus({...listStatus, loading: false});
  };

  // 스크롤 처리
  const onEndReached = () => {
    if (!listStatus.loading && !listStatus.noMore) {
      console.log('onEndReached ~~~~~~');
      getInquiryList();
    }
  };

  // 검색 이벤트 처리
  const onSearchSubmit = async () => {
    setListStatus({...listStatus, offset: 0, noMore: false});
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
    setListStatus({...listStatus, offset: 0, noMore: false, isRefreshing: true});
  };

  return (
    <SafeAreaView style={[styles.container]} edges={['bottom']}>
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

      <FlatList
        contentContainerStyle={[styles.list]}
        data={inquiryList}
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
          listStatus.loading && <ActivityIndicator size={'large'} color="0067CC" />
        }
        onRefresh={onRefresh}
        refreshing={listStatus.isRefreshing}
      />
      <InquiryButton routeName="BO_Inquiry" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchArea: {
    paddingHorizontal: 12,
    backgroundColor: globalStyles.color.purple,
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
