import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import globalStyles from '../../styles/globalStyles';

function CustomInput({hasMarginBottom, height, ...rest}) {
  return (
    <TextInput
      placeholderTextColor={globalStyles.color.grayLight}
      style={[styles.input, hasMarginBottom && styles.margin, height && {height}]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: globalStyles.color.grayLight,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: globalStyles.color.white,
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: globalStyles.color.text,
  },
  margin: {
    marginBottom: 16,
  },
});

export default CustomInput;
