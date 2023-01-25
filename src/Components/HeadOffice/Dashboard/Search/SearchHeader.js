import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import SelectDropdown from 'react-native-select-dropdown';
import globalStyles from '../../../../styles/globalStyles';
import SearchTextInput from '../../../BranchOffice/Dashboard/SearchTextInput';
import Icon from 'react-native-vector-icons/Feather';
import HeaderBackButton from '../../../common/HeaderBackButton';
import {useNavigation} from '@react-navigation/native';

function SearchHeader({
  title,
  searchCategory,
  searchPlaceHolder,
  searchString,
  setSearchString,
  searchIndex,
  setSearchIndex,
  onSearchSubmit,
  isBackButton = false,
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <View style={[styles.statusBar]} />
      <View style={[styles.space6]} />
      <View style={[styles.searchTitleContainer]}>
        <HeaderBackButton
          onPress={() => (isBackButton ? navigation.goBack() : null)}
          color={isBackButton ? globalStyles.color.white : globalStyles.color.purple}
        />
        <View style={[styles.headerContainer]}>
          <Text style={[styles.headerTitle]}>{title}</Text>
        </View>
        <HeaderBackButton color={globalStyles.color.purple} />
      </View>

      <View style={[styles.searchContainer]}>
        <SelectDropdown
          defaultButtonText={searchCategory[0]}
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
          statusBarTranslucent={true}
        />
        <View style={[styles.padding]} />
        <SearchTextInput
          onSubmitEditing={onSearchSubmit}
          keyboardType="default"
          returnKeyType="search"
          autoCapitalize="none"
          placeholder={searchPlaceHolder}
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
  space6: {
    height: 6,
  },
  searchTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    // fontFamily: globalStyles.font.bold,
    fontWeight: '600',
    fontSize: 17,
    color: globalStyles.color.white,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 24,
    paddingHorizontal: 12,
    width: '100%',
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
