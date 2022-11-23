import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryButton from '../Inquiry/InquiryButton';

function BO_Dashboard() {
  const navigation = useNavigation();
  const onDetail = function () {
    navigation.navigate('BO_Detail');
  };
  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <Text>Branch Office Dashboard</Text>
      <Button title="Branch Office Detail" onPress={onDetail} />
      <InquiryButton />
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
