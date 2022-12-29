import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/global';
import Attachments from '../Inquiry/Attachments';
import TopMenu from './TopMenu';

// {staffId, content, updateDate}
const CommentItem = ({data: commentData}) => {
  // 타임존 제거
  const date = new Date(commentData.updateDate.slice(0, -1));
  const navigation = useNavigation();
  const [attachments] = useState(commentData.attachments);

  const onModify = useCallback(() => {
    navigation.navigate('BO_Detail_Modify_Comment', {
      data: {...commentData, attachments: attachments},
    });
  }, [attachments, commentData, navigation]);

  const onDelete = () => {};
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
        <TopMenu onModify={onModify} onDelete={onDelete} menuColor={globalStyles.color.text} />
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
