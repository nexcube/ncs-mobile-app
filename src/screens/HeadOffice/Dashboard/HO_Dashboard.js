import React from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function HO_Dashboard({navigation, route}) {
  const onDetail = () => navigation.navigate('HO_Detail');

  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>Head Office Dashboard</Text>
      <Button title="Head Office Detail" onPress={onDetail} />
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
