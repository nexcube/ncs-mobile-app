import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../../styles/globalStyles';

function SearchTextInput({...rest}) {
  return (
    <View style={styles.SectionStyle}>
      <Icon name="search" size={20} style={[styles.icon]} />
      <TextInput style={[styles.input]} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalStyles.color.white,
    marginBottom: 12,
    borderRadius: 6,
    paddingHorizontal: 16,
    height: 48,
    flex: 1,
  },
  input: {
    paddingHorizontal: 8,
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
  },
  icon: {
    color: globalStyles.color.gray,
  },
});

export default SearchTextInput;
