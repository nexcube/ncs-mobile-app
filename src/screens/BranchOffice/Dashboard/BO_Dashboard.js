import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryList from '../../../Components/InquiryList';
import InquiryButton from '../Inquiry/InquiryButton';

function BO_Dashboard({navigation, route}) {
  const onDetail = function () {
    navigation.navigate('BO_Detail');
  };

  const [todos, setTodos] = useState([
    {id: 1, text: '우리나라 대한민국'},
    {id: 2, text: '가나다라마바사아차'},
    {id: 3, text: '가나다라마바사아차'},
    {id: 4, text: '가나다라마바사아차'},
    {id: 5, text: '가나다라마바사아차'},
    {id: 6, text: '가나다라마바사아차'},
    {id: 7, text: '가나다라마바사아차'},
    {id: 8, text: '가나다라마바사아차'},
    {id: 9, text: '가나다라마바사아차'},
    {id: 10, text: '가나다라마바사아차'},
    {id: 11, text: '가나다라마바사아차'},
    {id: 12, text: '가나다라마바사아차'},
  ]);

  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <InquiryList todos={todos} />
      <Text>Branch Office Dashboard</Text>
      <Button title="Branch Office Detail" onPress={onDetail} />
      <InquiryButton routeName="BO_Inquiry" />
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
