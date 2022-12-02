import React, {useRef, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View, FlatList, StatusBar, Image} from 'react-native';
import InquiryCard from '../../../components/Inquiry/InquiryCard';
import InquiryStatus from '../../../components/Inquiry/inquiryStatus';
import InquiryButton from '../Inquiry/InquiryButton';

function BO_Dashboard({navigation, route}) {
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

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <View style={[styles.container]}>
      <InquiryStatus animHeaderValue={scrollOffsetY} />

      <FlatList
        contentContainerStyle={[styles.list]}
        data={todos}
        renderItem={({item}) => <InquiryCard />}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollOffsetY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={1}
        ItemSeparatorComponent={<View style={[styles.itemSeparator]} />}
      />
      <InquiryButton routeName="BO_Inquiry" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  itemSeparator: {
    height: 14,
  },
});

export default BO_Dashboard;
