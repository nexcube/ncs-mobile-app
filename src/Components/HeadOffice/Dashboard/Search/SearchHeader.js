import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import SelectDropdown from 'react-native-select-dropdown';
import globalStyles from '../../../../styles/globalStyles';
import SearchTextInput from '../../../BranchOffice/Dashboard/SearchTextInput';
import Icon from 'react-native-vector-icons/Feather';
import {useState} from 'react/cjs/react.development';

function SearchHeader({
  searchString,
  setSearchString,
  searchIndex,
  setSearchIndex,
  onSearchSubmit,
}) {
  const searchCategory = ['지점명', '제목', '제목&내용', '분류명', '담당자'];

  return (
    <View style={[styles.container]}>
      <View style={[styles.statusBar]} />

      <View style={[styles.searchTitleContainer]}>
        <Text style={[styles.headerTitle]}>검색</Text>
      </View>

      <View style={[styles.searchContainer]}>
        <SelectDropdown
          defaultButtonText="지점명"
          buttonStyle={styles.buttonStyle}
          data={searchCategory}
          onSelect={(selectedItem, index) => {
            // console.log(index);
            setSearchIndex(index);
          }}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={globalStyles.color.gray}
                size={18}
              />
            );
          }}
          dropdownStyle={styles.dropdownStyle}
        />
        <View style={[styles.padding]} />
        <SearchTextInput
          onSubmitEditing={onSearchSubmit}
          keyboardType="default"
          returnKeyType="search"
          autoCapitalize="none"
          placeholder="제목, 내용, 분류명, 지점명, 담당자로 검색"
          value={searchString}
          onChangeText={setSearchString}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.purple,
  },
  statusBar: {
    height: getStatusBarHeight(false),
  },
  searchTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  headerTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: globalStyles.color.white,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 24,
    paddingHorizontal: 12,
  },

  buttonStyle: {
    backgroundColor: globalStyles.color.white,
    borderRadius: 6,
    height: 48,
    width: 130,
    fontWeight: '700',
    fontSize: 14,
    color: globalStyles.color.text,
  },
  dropdownStyle: {
    backgroundColor: globalStyles.color.white,
    borderRadius: 6,
    fontWeight: '700',
    fontSize: 14,
    color: globalStyles.color.text,
  },
  padding: {
    width: 12,
  },
});

export default SearchHeader;
