import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import globalStyles from '../../styles/globalStyles';

function SelectionList({
  placeholder = '관련 지점',
  hasMarginBottom,
  data,
  setSelected,
  defaultSelection = '',
}) {
  const [isSelect, setIsSelect] = useState(false);
  const hasDefault = defaultSelection.length > 1;

  return (
    <View style={[hasMarginBottom && styles.margin]}>
      <SelectList
        placeholder={placeholder}
        search={false}
        fontFamily={globalStyles.font.regular}
        setSelected={val => {
          setIsSelect(val);
          const selected = data.filter(item => item.name === val);
          if (selected.length > 0) {
            setSelected(selected[0]);
          }
        }}
        boxStyles={[styles.boxStyles]}
        inputStyles={[
          styles.inputStyles,
          (isSelect || hasDefault) && {color: globalStyles.color.text},
        ]}
        dropdownTextStyles={[styles.dropdownTextStyles]}
        data={data.map(item => item.name)}
        save="value"
        defaultOption={{
          key: hasDefault && data.findIndex(item => item.name === defaultSelection),
          value: hasDefault && defaultSelection,
        }}
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
