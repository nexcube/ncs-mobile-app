import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles/globalStyles';
import FlatListFooterLoading from './common/FlatListFooterLoading';
import {VerticalSpace24} from './common/VerticalSpace';

function NoResult({message}) {
  return (
    <View style={[styles.noResultContainer]}>
      <VerticalSpace24 />
      <VerticalSpace24 />
      {message ? (
        message.map(m => <Text style={[styles.noResultTitle]}>{m}</Text>)
      ) : (
        <FlatListFooterLoading />
      )}

      {message && (
        <>
          <VerticalSpace24 />
          <Image style={[styles.image]} source={require('../../assets/images/Find.png')} />
        </>
      )}
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
