import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const InquiryCard = () => (
  <Card style={[styles.container]} mode="contained">
    <View style={[styles.head]} />
    <Card.Title
      titleStyle={[styles.title]}
      title="abcdefg제목은 두 줄까지 표시되고 말끝은 말줄임표 처리됩니다!!!!!!. 제목은 두줄까지 표시되고 말끝은 말줄임표 처리됩니다."
      titleNumberOfLines={2}
    />
    <View style={[styles.separator]} />
    <Card.Content>
      <Paragraph style={[styles.content]}>채용 > 교육입과 신청/ 문의 </Paragraph>
      <Paragraph style={[styles.description]}>가산점 홍길동 원장: 2022.10.21 11:45 </Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  head: {
    height: 30,
    width: '100%',
    backgroundColor: '#332D41',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 15,
    // fontWeight: '600',
    color: '#333333',
  },
  content: {
    fontSize: 13,
    fontWeight: '900',
    color: '#666666',
  },
  description: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999999',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 15,
  },
});

export default InquiryCard;
