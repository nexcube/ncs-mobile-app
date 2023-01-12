import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {StyleSheet, View, Animated, FlatList, Text} from 'react-native';
import ResponseStatus from '../../../components/HeadOffice/Dashboard/ResponseStatus';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import InquiryCard from '../../../components/BranchOffice/Dashboard//InquiryCard';
import BottomSheet, {BottomSheetType} from '../../../components/common/bottomsheet/BottomSheet';
import CustomSwitch from '../../../components/common/CustomSwitch';
import useCustomSwitch from '../../../hooks/useCustomSwitch';
import useBottomSheet from '../../../hooks/useBottomSheet';
import UserContext from '../../../services/context/UserContext';
import apiInquiryListAssigned from '../../../services/api/inquiry/listAssigned';
import useInquiryList from '../../../hooks/useInquiryLIst';
import {useEffect} from 'react/cjs/react.development';
import {ActivityIndicator} from 'react-native-paper';
import apiInquiryListRelated from '../../../services/api/inquiry/listRelated';
import apiInquiryList from '../../../services/api/inquiry/list';

const fetchCount = 7;

function HO_Dashboard({navigation, route}) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  // 상태 //////////////////////////////////////////////////////////////////////////////////////////
  const [tabIndex, setTabIndex] = useState(0);
  const {isOn: isIncludeDone, onToggle} = useCustomSwitch('isIncludeDone');
  const [config, showInfo, hideInfo] = useBottomSheet(BottomSheetType.ResponseInfo);
  const [User, , isHO] = useContext(UserContext);
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
    switch (tabIndex) {
      case 0: // assignedMe
        apiInquiryListAssigned(
          User.staffId,
          User.assignedCatIdx,
          offset,
          fetchCount,
          isIncludeDone,
          onSuccess,
          onFail,
        );
        break;
      case 1: // relatedMe
        apiInquiryListRelated(
          User.staffId,
          User.assignedCatIdx,
          User.relatedCatIdxs,
          offset,
          fetchCount,
          isIncludeDone,
          onSuccess,
          onFail,
        );
        break;
      case 2: // all
        apiInquiryList('', offset, fetchCount, isIncludeDone, onSuccess, onFail);
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData(0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIncludeDone, tabIndex]),
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

  // 클릭 처리
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
      console.log('onEndReached...');
      getData(status.offset);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
  };

  const onPressInfo = () => {
    showInfo();
  };

  return (
    <View>
      <ResponseStatus
        animHeaderValue={scrollOffsetY}
        onPressInfo={onPressInfo}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        isIncludeDone={isIncludeDone}
      />

      <FlatList
        ListHeaderComponent={
          <View style={[styles.listHeader]}>
            <CustomSwitch text="완료 포함" value={isIncludeDone} onValueChange={onToggle} />
          </View>
        }
        contentContainerStyle={[styles.list]}
        data={list}
        renderItem={({item, index}) => (
          <Pressable onPress={() => onItemSelected(item)}>
            <InquiryCard
              key={item.idx}
              title={`count: ${index + 1} qnaIdx: ${item.idx} \n${item.title} `}
              mainCatName={item.mainCatName}
              subCatName={item.subCatName}
              branchOfficeName={item.branchOfficeName}
              inquirer={item.inquirer}
              levelName={item.levelName}
              updateDate={item.updateDate}
              status={item.status}
              isHO={isHO}
              commentCount={item?.commentCount ?? 0}
              assignedStaffId={item?.assignedStaffId}
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
        onEndReached={onEndReached}
        ListFooterComponent={status.loading && <ActivityIndicator size={'large'} color="0067CC" />}
        onRefresh={onRefresh}
        refreshing={status.isRefreshing}
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
  overlay: {
    position: 'absolute',
    top: 100,

    left: 100,

    color: 'red',
  },
});

export default HO_Dashboard;

// <Text>Head Office Dashboard</Text>
// <Button title="Head Office Detail" onPress={onDetail} />
//   const onDetail = () => navigation.navigate('HO_Detail');
