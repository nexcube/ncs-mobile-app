import React from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function BO_Dashboard() {
  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>Branch Office Dashboard</Text>
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

export default BO_Dashboard;
