import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, Button, View, Animated, FlatList, ImageBackground} from 'react-native';

import ResponseStatus from '../../../components/HeadOffice/Dashboard/ResponseStatus';
import ResponseTab from '../../../components/HeadOffice/Dashboard/ResponseTab';
import globalStyles from '../../../styles/globalStyles';
import apiInquiryList from '../../../services/api/inquiry/list';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import InquiryCard from '../../../components/BranchOffice/Dashboard//InquiryCard';
import BottomSheet from '../../../components/common/bottomsheet/BottomSheet';

function HO_Dashboard({navigation, route}) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  // 상태 //////////////////////////////////////////////////////////////////////////////////////////
  const [inquiryList, setInquiryList] = useState([]);
  const [visibleBS, setVisibleBS] = useState({
    visible: false,
    format: 'CancelInquiry',
  });

  useFocusEffect(
    useCallback(() => {
      apiInquiryList('', 0, 7, onSuccess, onFail);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onSuccess = data => {
    setInquiryList([...data]);
  };

  const onFail = () => {};

  // 클릭 처리
  const onItemSelected = item => {
    const params = {
      index: item.idx,
    };
    // console.log(params);
    navigation.navigate('BO_Detail', params);
  };

  const onPressInfo = () => {
    setVisibleBS(true);
    console.log('Info....');
  };

  const onPressBSOk = () => {
    setVisibleBS(false);
  };

  const image = {uri: 'https://reactjs.org/logo-og.png'};
  return (
    <View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ResponseStatus animHeaderValue={scrollOffsetY} onPressInfo={onPressInfo} />
        <View style={[styles.tabArea]}>
          <ResponseTab />
        </View>
      </ImageBackground>
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
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={<View style={[styles.itemSeparator]} />}
      />
      <BottomSheet sheetStatus={visibleBS} onOk={onPressBSOk} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabArea: {
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

export default HO_Dashboard;

// <Text>Head Office Dashboard</Text>
// <Button title="Head Office Detail" onPress={onDetail} />
//   const onDetail = () => navigation.navigate('HO_Detail');
