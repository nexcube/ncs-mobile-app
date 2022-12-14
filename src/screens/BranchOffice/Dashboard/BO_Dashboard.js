import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import InquiryCard from '../../../components/Inquiry/InquiryCard';
import InquiryStatus from '../../../components/Inquiry/inquiryStatus';
import userData from '../../../services/DeviceStorage';
import InquiryButton from '../Inquiry/InquiryButton';

function BO_Dashboard({navigation, route}) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const [inquiryList, setInquiryList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetchCount = 7;

  useEffect(() => {
    getInquiryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isRefreshing) {
      console.log('isRefreshing useEffect');
      getInquiryList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshing]);

  const getInquiryList = async searchString => {
    console.log(searchString);
    if (loading) {
      return;
    }
    setLoading(true);

    const jwt = await userData.getJWT();
    const token = `${jwt}`;
    let url = '/inquiry/list';
    const params = {
      offset: offset,
      fetchCount: fetchCount,
    };

    if (searchString?.length > 0) {
      params.searchString = searchString;
      params.offset = 0;
      url = '/inquiry/search';
    }

    axios
      .get(url, {
        headers: {authorization: token},
        params: params,
      })
      .then(res => {
        // console.log(res.data);
        if (res.data.length === 0) {
          setNoMore(true);
        }
        if (searchString?.length > 0 && params.offset === 0) {
          setInquiryList([...res.data]);
        } else {
          setInquiryList([...inquiryList, ...res.data]);
        }

        setOffset(offset + fetchCount);
      })
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        console.error(error);
      });

    setIsRefreshing(false);
  };

  const onEndReached = () => !noMore && getInquiryList();

  const onSearchSubmit = data => {
    getInquiryList(data);
  };

  const onRefresh = () => {
    setOffset(0);
    setNoMore(false);
    setInquiryList([]);
    setIsRefreshing(true);
  };

  return (
    <View style={[styles.container]}>
      <InquiryStatus
        isRefresh={isRefreshing}
        animHeaderValue={scrollOffsetY}
        onSearchSubmit={onSearchSubmit}
      />

      <FlatList
        contentContainerStyle={[styles.list]}
        data={inquiryList}
        renderItem={({item}) => (
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
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator size={'large'} color="0067CC" />}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      <InquiryButton routeName="BO_Inquiry" />
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

export default BO_Dashboard;
