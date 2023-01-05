import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import UserContext from '../../../services/context/UserContext';
import globalStyles from '../../../styles/globalStyles';

import InquiryCardHeader from './InquiryCardHeader';
import {getTimeDiff} from '../../../Utils/timeDiff';

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
  assignedStaffId,
  commentCount = 0,
  mode = 'elevated',
}) => {
  // 타임존 제거
  const date = new Date(updateDate?.slice(0, -1));

  const [User, , isHO] = React.useContext(UserContext);

  return (
    <Card style={[styles.container]} mode={mode}>
      <InquiryCardHeader
        forDetail={forDetail}
        status={status}
        commentCount={commentCount}
        assignedStaffId={assignedStaffId}
      />
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
        {isHO && (
          <View>
            <View style={[styles.separator]} />
            <Card.Content style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
              <Paragraph style={[styles.content]}>
                {User.departName} {User.staffName} {User.rankName ?? '사원'}
              </Paragraph>
              <Paragraph style={[styles.time]}>{getTimeDiff(date)}</Paragraph>
            </Card.Content>
          </View>
        )}
        <View style={[{paddingBottom: 8}]} />
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
    paddingTop: 8,
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
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 15,
    marginVertical: 8,
  },
  time: {
    fontSize: 13,
    fontWeight: '600',
    color: globalStyles.color.gray,
  },
});

export default InquiryCard;
