import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/global';
import TopMenu from './TopMenu';

// {staffId, content, updateDate}
const CommentItem = ({data}) => {
  // 타임존 제거
  const date = new Date(data.updateDate.slice(0, -1));

  const navigation = useNavigation();

  const onModify = () => {
    navigation.navigate('BO_Detail_Modify_Comment', {data});
  };
  const onDelete = () => {};
  return (
    <View>
      <View style={[styles.container]}>
        <View style={[styles.iconContainer]}>
          <Icon name="user" size={20} color={globalStyles.color.white} />
        </View>
        <View style={[styles.header]}>
          <Text style={[styles.writer]}>{`${data.departName} ${data.name} ${data.rankName}`}</Text>
          <View style={[styles.dateContainer]}>
            <Text style={[styles.date]}>{date.toLocaleString()}</Text>
          </View>
        </View>
        <TopMenu onModify={onModify} onDelete={onDelete} menuColor={globalStyles.color.text} />
      </View>
      <View style={[styles.contentContainer]}>
        <Text>{data.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.white,
    borderWidth: 1,
    borderColor: globalStyles.color.grayLight,
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
});
export default CommentItem;
