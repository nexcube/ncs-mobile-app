import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import apiCommentDeleteItem from '../../../services/api/comment/deleteItem';
import UserContext from '../../../services/context/UserContext';
import globalStyles from '../../../styles/globalStyles';

import Attachments from '../Dashboard/Attachments';
import TopMenu from './TopMenu';

// {staffId, content, updateDate}
const CommentItem = ({commentData, commentList, setCommentList}) => {
  console.log('CommentItem..... : ', JSON.stringify(commentData, null, '\t'));
  // 타임존 제거
  const date = new Date(commentData.updateDate.slice(0, -1));
  const navigation = useNavigation();
  const [attachments, setAttachments] = useState(commentData.attachments);
  const [User, ,] = useContext(UserContext);

  const onModify = useCallback(() => {
    navigation.navigate('BO_Detail_Modify_Comment', {
      data: {...commentData, attachments: attachments},
    });
  }, [attachments, commentData, navigation]);

  useFocusEffect(
    useCallback(() => {
      setAttachments(commentData.attachments);
    }, [commentData.attachments]),
  );

  const onDelete = () => {
    Alert.alert('주의', '정말로 삭제하시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => apiCommentDeleteItem(commentData.idx, onSuccessCommentDelete),
      },
    ]);
  };

  const onSuccessCommentDelete = () => {
    const result = commentList.filter(item => item.idx !== commentData.idx);
    setCommentList(result);
  };

  return (
    <View>
      <View style={[styles.container, globalStyles.elevated]}>
        <View style={[styles.iconContainer]}>
          <Icon name="user" size={20} color={globalStyles.color.white} />
        </View>
        <View style={[styles.header]}>
          <Text
            style={[
              styles.writer,
            ]}>{`${commentData.departName} ${commentData.name} ${commentData.rankName}`}</Text>
          <View style={[styles.dateContainer]}>
            <Text style={[styles.date]}>{date.toLocaleString()}</Text>
          </View>
        </View>
        {commentData.staffId === User.staffId && (
          <TopMenu onModify={onModify} onDelete={onDelete} menuColor={globalStyles.color.text} />
        )}
      </View>
      <View style={[styles.contentContainer]}>
        <Text>{commentData.content}</Text>
      </View>
      <View style={[styles.attachmentsContainer]}>
        <Attachments attachments={attachments} isShowDelete={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.white,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: globalStyles.color.purple,
    padding: 5,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  header: {flex: 1, marginHorizontal: 18},
  writer: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    color: globalStyles.color.text,
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  date: {
    fontFamily: globalStyles.font.regular,
    fontSize: 13,
    color: globalStyles.color.gray,
  },
  attachmentsContainer: {
    padding: 20,
  },
});
export default CommentItem;
