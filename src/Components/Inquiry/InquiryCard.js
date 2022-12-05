import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import globalStyles from '../../styles/global';

import InquiryCardHeader from './InquiryCardHeader';

const InquiryCard = ({status = 'new', commentCount = 1}) => (
  <Card style={[styles.container]} mode="contained">
    <InquiryCardHeader status={status} commentCount={commentCount} />

    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[{opacity: status === 'hold' ? 0.6 : 1}]}>
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
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.white,
  },
  title: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    color: globalStyles.color.text,
  },
  content: {
    fontSize: 13,
    fontWeight: '900',
    color: globalStyles.color.grayDark,
  },
  description: {
    fontSize: 13,
    color: globalStyles.color.gray,
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 15,
  },
});

export default InquiryCard;
