import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import globalStyles from '../styles/global';

function SelectionList({hasMarginBottom, data, setSelected}) {
  return (
    <View style={[hasMarginBottom && styles.margin]}>
      <SelectList
        placeholder="관련 지점"
        search={false}
        fontFamily={globalStyles.font.regular}
        setSelected={val => setSelected(val)}
        boxStyles={[styles.boxStyles]}
        inputStyles={[styles.inputStyles]}
        dropdownTextStyles={[styles.dropdownTextStyles]}
        data={data}
        save="value"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boxStyles: {
    borderRadius: 4,
    backgroundColor: globalStyles.color.white,
    borderWidth: 1,
    borderColor: globalStyles.color.grayLight,
  },
  inputStyles: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: globalStyles.color.grayLight,
  },
  dropdownTextStyles: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: globalStyles.color.gray,
  },
  margin: {
    marginBottom: 16,
  },
});

export default SelectionList;
