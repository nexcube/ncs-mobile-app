import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {QnaStatus} from '../../../services/config';
import UserContext from '../../../services/context/UserContext';
import globalStyles from '../../../styles/globalStyles';

function InquiryCardHeader({status, share, commentCount = 0, forDetail, assignedStaffId}) {
  const [User, , isHO] = useContext(UserContext);

  const containerStyle = {
    backgroundColor: forDetail
      ? globalStyles.color.white
      : status === QnaStatus.HOLD.value
      ? globalStyles.color.gray
      : status === QnaStatus.DONE.value
      ? globalStyles.color.gray
      : globalStyles.color.purple,
  };
  const statusStyle = {
    backgroundColor:
      status === QnaStatus.NEW.value
        ? globalStyles.color.red
        : status === QnaStatus.INPROGRESS.value
        ? '#FF5B05'
        : '#00B578',
  };

  const statusTextStyle = {
    color: status === QnaStatus.NEW.value ? globalStyles.color.white : globalStyles.color.white,
  };

  const statusText =
    status === QnaStatus.NEW.value
      ? QnaStatus.NEW.name
      : status === QnaStatus.INPROGRESS.value
      ? QnaStatus.INPROGRESS.name
      : status === QnaStatus.HOLD.value
      ? QnaStatus.HOLD.name
      : QnaStatus.DONE.name;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[globalStyles.row]}>
        <View style={[styles.status, statusStyle]}>
          <Text style={[styles.statusText, statusTextStyle]}>{statusText}</Text>
        </View>
        {isHO && User.staffId === assignedStaffId && (
          <View style={[styles.status, styles.assignedContainer]}>
            <Text style={[styles.statusText, styles.assignedText]}>내담당</Text>
          </View>
        )}
      </View>
      <View style={[globalStyles.row]}>
        {isHO && share > 0 && (
          <View style={[styles.comment]}>
            <Text style={[styles.commentText]}>모두공유</Text>
          </View>
        )}

        {commentCount > 0 && (
          <View style={[styles.comment]}>
            <Text style={[styles.commentText]}>댓글 {commentCount}개</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  status: {
    borderRadius: 16,
    borderColor: globalStyles.color.white,
    borderWidth: 1,
  },
  statusText: {
    fontFamily: globalStyles.font.title,
    fontSize: 12,
    paddingHorizontal: 5,
  },
  assignedContainer: {backgroundColor: globalStyles.color.red, marginLeft: 5},
  assignedText: {color: globalStyles.color.white},

  comment: {
    backgroundColor: globalStyles.color.white,
    borderRadius: 16,
    borderColor: globalStyles.color.white,
    borderWidth: 1,
    marginLeft: 5,
  },
  commentText: {
    fontFamily: globalStyles.font.title,
    fontSize: 12,
    paddingHorizontal: 5,
    color: globalStyles.color.text,
  },
});

export default InquiryCardHeader;
