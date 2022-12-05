import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalStyles from '../../styles/global';

function InquiryCardHeader({status, commentCount}) {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: status === 'hold' ? globalStyles.color.gray : globalStyles.color.purple},
      ]}>
      <View
        style={[
          styles.status,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor:
              status === 'new'
                ? globalStyles.color.white
                : status === 'proceeding'
                ? '#FF5B05'
                : '#00B578',
          },
        ]}>
        <Text
          style={[
            styles.statusText,
            // eslint-disable-next-line react-native/no-inline-styles
            {color: status === 'new' ? globalStyles.color.text : globalStyles.color.white},
          ]}>
          {status === 'new'
            ? '신규'
            : status === 'proceeding'
            ? '진행중'
            : status === 'hold'
            ? '보류'
            : '완료'}
        </Text>
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
    paddingHorizontal: 24,
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
