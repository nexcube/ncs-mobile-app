import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import InquiryCard from '../../../components/Inquiry/InquiryCard';
import InquiryStatus from '../../../components/Inquiry/inquiryStatus';
import userData from '../../../services/DeviceStorage';
import globalStyles from '../../../styles/global';
import InquiryButton from '../Inquiry/InquiryButton';

function BO_Dashboard({navigation, route}) {
  const [inquiryList, setInquiryList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const fetchCount = 7;

  useEffect(() => {
    getInquiryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInquiryList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    axios
      .get('/inquiry/list', {
        headers: {authorization: token},
        params: {offset: offset, fetchCount: fetchCount},
      })
      .then(res => {
        console.log(res.data);
        if (res.data.length === 0) {
          setNoMore(true);
        }
        setInquiryList([...inquiryList, ...res.data]);
        setOffset(offset + fetchCount);
      })
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const onEndReached = () => !noMore && getInquiryList();

  return (
    <View style={[styles.container]}>
      <InquiryStatus animHeaderValue={scrollOffsetY} />

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
