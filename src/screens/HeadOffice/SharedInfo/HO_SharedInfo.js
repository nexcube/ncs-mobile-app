import React from 'react';
import {StyleSheet, Text, Button, Image, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function HO_SharedInfo({navigation, route}) {
  const onDetail = () => navigation.navigate('HO_Detail');
  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>Head Office SharedInfo</Text>
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

export default HO_SharedInfo;
