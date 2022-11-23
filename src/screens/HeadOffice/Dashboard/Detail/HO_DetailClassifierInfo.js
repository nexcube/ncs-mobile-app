import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

function HO_DetailClassifierInfo({navigation, route}) {
  const onClassifierSearch = () => navigation.navigate('HO_Detail_Classifier_Search');
  return (
    <View style={[styles.fullscreen]}>
      <Text>Head Office Detail Classifier Info</Text>
      <Button title="담당자 검색" onPress={onClassifierSearch} />
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

export default HO_DetailClassifierInfo;
