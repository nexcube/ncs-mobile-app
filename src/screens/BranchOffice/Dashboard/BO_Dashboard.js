import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, FlatList, Pressable} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryCard from '../../../components/Inquiry/InquiryCard';
import InquiryStatus from '../../../components/Inquiry/inquiryStatus';
import SearchTextInput from '../../../components/Inquiry/SearchTextInput';
import apiInquiryList from '../../../services/api/inquiryList';
import globalStyles from '../../../styles/global';
import InquiryButton from '../Inquiry/InquiryButton';

function BO_Dashboard({navigation, route}) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  // Status ////////////////////////////////////////////////////////////////////////////////////////
  const [inquiryList, setInquiryList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchString, setSearchString] = useState('');

  // 리스트 기본 갯수;
  const fetchCount = 7;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInquiryList();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  // 리프레쉬 리스트 가져오기
  useEffect(() => {
    if (isRefreshing) {
      getInquiryList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshing]);

  // 검색어로 리스트 가져오기
  const getInquiryList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    apiInquiryList(searchString, offset, fetchCount, onSuccess, onFail).then(() =>
      setIsRefreshing(false),
    );
  };

  const onSuccess = (data, _offset) => {
    // 더이상 데이터가 없는가?
    if (data.length === 0) {
      setNoMore(true);
    }
    // 검색을 통한 경우 기존것을 비우고 새로 리스트를 만든다.
    if (searchString?.length > 0 && _offset === 0) {
      setInquiryList([...data]);
    } else {
      if (_offset > 0) {
        setInquiryList([...inquiryList, ...data]);
      } else {
        setInquiryList([...data]);
      }
    }
    setOffset(_offset + fetchCount);
    setLoading(false);
  };

  const onFail = () => {
    setLoading(false);
  };

  // 스크롤 처리
  const onEndReached = () => !noMore && getInquiryList();

  // 검색 이벤트 처리
  const onSearchSubmit = () => {
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
    setOffset(0);
    setNoMore(false);
    setInquiryList([]);
    setIsRefreshing(true);
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
              title={item.title}
              mainCatName={item.mainCatName}
              subCatName={item.subCatName}
              branchOfficeName={item.branchOfficeName}
              inquirer={item.inquirer}
              levelName={item.levelName}
              updateDate={item.updateDate}
              status={item.status}
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
        scrollEventThrottle={1}
        ItemSeparatorComponent={<View style={[styles.itemSeparator]} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loading && <ActivityIndicator size={'large'} color="0067CC" />}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
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
