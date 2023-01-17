import React from 'react';
import {StyleSheet, View} from 'react-native';

function VerticalSpace6() {
  return <View style={[styles.verticalSpace6]} />;
}

function VerticalSpace12() {
  return <View style={[styles.verticalSpace12]} />;
}

function VerticalSpace24() {
  return <View style={[styles.verticalSpace24]} />;
}

const styles = StyleSheet.create({
  verticalSpace6: {
    height: 6,
  },
  verticalSpace12: {
    height: 12,
  },
  verticalSpace24: {
    height: 24,
  },
});

export {VerticalSpace6, VerticalSpace12, VerticalSpace24};
