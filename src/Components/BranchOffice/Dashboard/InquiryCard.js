import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import globalStyles from '../../../styles/globalStyles';

import InquiryCardHeader from './InquiryCardHeader';

const InquiryCard = ({
  title,
  mainCatName,
  subCatName,
  branchOfficeName,
  inquirer,
  levelName,
  updateDate,
  status,
  forDetail,
  commentCount = 0,
  mode = 'elevated',
}) => {
  // 타임존 제거
  const date = new Date(updateDate?.slice(0, -1));

  return (
    <Card style={[styles.container]} mode={mode}>
      <InquiryCardHeader forDetail={forDetail} status={status} commentCount={commentCount} />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={[{opacity: status === 'HOLD' ? 0.6 : 1}]}>
        <Card.Title titleStyle={[styles.title]} title={title} titleNumberOfLines={2} />
        <View style={[styles.separator]} />
        <Card.Content style={[forDetail && styles.contentContainer]}>
          <Paragraph style={[styles.content]}>
            {mainCatName} > {subCatName}
          </Paragraph>
          <Paragraph style={[styles.description]}>
            {branchOfficeName} {inquirer} {levelName}: {date.toLocaleString()}
          </Paragraph>
        </Card.Content>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.white,
  },
  title: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    color: globalStyles.color.text,
  },
  contentContainer: {
    paddingTop: 12,
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