import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles/globalStyles';

function NoResult() {
  return (
    <View style={[styles.noResultContainer]}>
      <Text style={[styles.noResultTitle]}>검색결과가 없습니다. </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultTitle: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: globalStyles.color.gray,
  },
});

export default NoResult;
