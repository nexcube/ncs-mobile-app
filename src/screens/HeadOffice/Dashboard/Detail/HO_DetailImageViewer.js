import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function HO_DetailImageViewer({navigation, route}) {
  return (
    <View style={[styles.fullscreen]}>
      <Text>Head Office Detail Image Viewer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HO_DetailImageViewer;
