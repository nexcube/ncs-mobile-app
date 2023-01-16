import React from 'react';
import {StyleSheet, View} from 'react-native';

function VerticalSpace12() {
  return <View style={[styles.verticalSpace12]} />;
}

function VerticalSpace24() {
  return <View style={[styles.verticalSpace24]} />;
}

const styles = StyleSheet.create({
  verticalSpace12: {
    height: 12,
  },
  verticalSpace24: {
    height: 24,
  },
});

export {VerticalSpace12, VerticalSpace24};
