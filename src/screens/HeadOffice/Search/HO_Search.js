import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, Text, Button, FlatList, View, Animated} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useEffect, useState} from 'react/cjs/react.development';
import InquiryCard from '../../../components/BranchOffice/Dashboard/InquiryCard';
import SearchTextInput from '../../../components/BranchOffice/Dashboard/SearchTextInput';
import CustomSwitch from '../../../components/common/CustomSwitch';
import useCustomSwitch from '../../../hooks/useCustomSwitch';
import apiInquiryList from '../../../services/api/inquiry/list';
import globalStyles from '../../../styles/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';

function HO_Search({navigation, route}) {
  const [inquiryList, setInquiryList] = useState([]);
  const {isOn, onToggle} = useCustomSwitch('isIncludeDone');

  useFocusEffect(
    useCallback(() => {
      apiInquiryList('', 0, 7, onSuccess, onFail);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Banana', value: 'banana'},
    {label: 'Banana', value: 'banana'},
  ]);

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

  return (
    <View>
      <View style={[styles.searchArea]}>
        <View style={[styles.statusBar]} />
        <View style={[{flexDirection: 'row', justifyContent: 'center'}]}>
          <Text style={[styles.headerTitle]}>검색</Text>
        </View>
        <View style={[styles.searchContainer]}>
          <DropDownPicker
            containerStyle={{width: 100}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            zIndex={1000}
          />
          <SearchTextInput
            style={[{marginHorizontal: 20}]}
            // onSubmitEditing={onSearchSubmit}
            // hasMarginBottom
            keyboardType="default"
            returnKeyType="search"
            autoCapitalize="none"
            placeholder="제목, 내용, 댓글, 담당자로 검색"
            // value={searchString}
            // onChangeText={setSearchString}
          />
        </View>
      </View>

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
        scrollEventThrottle={200}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={<View style={[styles.itemSeparator]} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: getStatusBarHeight(false),
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: globalStyles.color.white,
  },
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
  searchArea: {
    // alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: globalStyles.color.purple,
  },
  searchContainer: {
    flexDirection: 'row',
  },
});

export default HO_Search;
