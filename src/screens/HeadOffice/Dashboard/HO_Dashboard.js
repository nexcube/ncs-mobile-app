import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View, Animated, FlatList} from 'react-native';
import ResponseStatus from '../../../components/HeadOffice/Dashboard/ResponseStatus';
import apiInquiryList from '../../../services/api/inquiry/list';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import InquiryCard from '../../../components/BranchOffice/Dashboard//InquiryCard';
import BottomSheet, {BottomSheetType} from '../../../components/common/bottomsheet/BottomSheet';
import CustomSwitch from '../../../components/common/CustomSwitch';
import useCustomSwitch from '../../../hooks/useCustomSwitch';
import useBottomSheet from '../../../hooks/useBottomSheet';
import apiResponsibilityList from '../../../services/api/setting/responsibilityList';

function HO_Dashboard({navigation, route}) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  // 상태 //////////////////////////////////////////////////////////////////////////////////////////
  const [inquiryList, setInquiryList] = useState([]);
  const {isOn, onToggle} = useCustomSwitch('isIncludeDone');
  const [config, showInfo, hideInfo] = useBottomSheet(BottomSheetType.ResponseInfo);

  useFocusEffect(
    useCallback(() => {
      apiResponsibilityList().then(responsibilityList => {
        // console.log(JSON.stringify(data, null, '\t'));
      });
      // apiInquiryList('', 0, 7, onSuccess, onFail);
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
    showInfo();
  };

  return (
    <View>
      <ResponseStatus animHeaderValue={scrollOffsetY} onPressInfo={onPressInfo} />
      <FlatList
        ListHeaderComponent={
          <View style={[styles.listHeader]}>
            <CustomSwitch text="완료 포함" value={isOn} onValueChange={onToggle} />
          </View>
        }
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

      <BottomSheet sheetStatus={config} onOk={hideInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default HO_Dashboard;

// <Text>Head Office Dashboard</Text>
// <Button title="Head Office Detail" onPress={onDetail} />
//   const onDetail = () => navigation.navigate('HO_Detail');
