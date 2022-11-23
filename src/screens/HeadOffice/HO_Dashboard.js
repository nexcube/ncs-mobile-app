import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function HO_Dashboard() {
  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>Head Office Dashboard</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HO_Dashboard;
