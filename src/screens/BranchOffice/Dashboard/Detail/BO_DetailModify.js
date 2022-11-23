import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function BO_DetailModify({navigation, route}) {
  return (
    <View style={[styles.fullscreen]}>
      <Text>Branch Office Detail Modify</Text>
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

export default BO_DetailModify;
