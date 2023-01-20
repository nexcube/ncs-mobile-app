import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';

function FlatListFooterLoading() {
  return (
    <View style={[styles.margin10]}>
      <ActivityIndicator size={'small'} color={globalStyles.color.purple} />
    </View>
  );
}

const styles = StyleSheet.create({
  margin10: {
    margin: 10,
  },
});

export default FlatListFooterLoading;
