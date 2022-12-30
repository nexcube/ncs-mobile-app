import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalStyles from '../../styles/global';

function InquiryCardHeader({status, commentCount, forDetail}) {
  const containerStyle = {
    backgroundColor: forDetail
      ? globalStyles.color.white
      : status === 'HOLD'
      ? globalStyles.color.gray
      : status === 'DONE'
      ? globalStyles.color.gray
      : globalStyles.color.purple,
  };
  const statusStyle = {
    backgroundColor:
      status === 'NEW' ? globalStyles.color.red : status === 'INPROGRESS' ? '#FF5B05' : '#00B578',
  };

  const statusTextStyle = {
    color: status === 'NEW' ? globalStyles.color.white : globalStyles.color.white,
  };

  const statusText =
    status === 'NEW'
      ? '신규'
      : status === 'INPROGRESS'
      ? '진행중'
      : status === 'HOLD'
      ? '보류'
      : '완료';

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.status, statusStyle]}>
        <Text style={[styles.statusText, statusTextStyle]}>{statusText}</Text>
      </View>
      {commentCount === 0 || (
        <View style={[styles.comment]}>
          <Text style={[styles.commentText]}>댓글 {commentCount}개</Text>
        </View>
      )}
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

  comment: {
    backgroundColor: globalStyles.color.white,
    borderRadius: 16,
    borderColor: globalStyles.color.white,
    borderWidth: 1,
  },
  commentText: {
    fontFamily: globalStyles.font.title,
    fontSize: 12,
    paddingHorizontal: 5,
    color: globalStyles.color.text,
  },
});

export default InquiryCardHeader;
