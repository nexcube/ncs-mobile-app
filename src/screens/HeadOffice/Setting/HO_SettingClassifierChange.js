import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

function HO_SettingClassifierChange({navigation, route}) {
  const onClassifyDetail = () => navigation.navigate('HO_Classify_Detail');
  return (
    <View style={[styles.fullscreen]}>
      <Text>Head Office Setting Classifier Change</Text>
      <Button title="분류상세" onPress={onClassifyDetail} />
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

export default HO_SettingClassifierChange;
