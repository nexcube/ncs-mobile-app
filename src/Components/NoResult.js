import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles/globalStyles';
import {VerticalSpace24} from './common/VerticalSpace';

function NoResult() {
  return (
    <View style={[styles.noResultContainer]}>
      <VerticalSpace24 />
      <VerticalSpace24 />
      <Text style={[styles.noResultTitle]}>검색결과가 존재하지 않습니다. </Text>
      <Text style={[styles.noResultTitle]}>다른 단어로 다시 시도해 보세요. </Text>
      <VerticalSpace24 />
      <Image style={[styles.image]} source={require('../../assets/images/Find.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  noResultContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noResultTitle: {
    fontFamily: globalStyles.font.regular,
    fontSize: 14,
    fontWeight: '700',
    color: globalStyles.color.grayDark,
    lineHeight: 25,
  },
});

export default NoResult;
