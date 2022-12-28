import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

function SettingBOList({BOList, userList, enableAddButton = true}) {
  const navigation = useNavigation();

  const userListComp = idx =>
    userList[idx].map((user, index) => (
      <View>
        <View style={[styles.listItem]}>
          <View style={[styles.iconContainer]}>
            <Icon name="user" size={30} color={globalStyles.color.white} />
          </View>
          <View style={[styles.userContainer]}>
            <Text style={[styles.user]}>{user}</Text>
          </View>
        </View>
        <View style={[styles.separatorPadding]}>
          {index === 0 || index === user.length - 1 ? <Divider style={[styles.separator]} /> : null}
        </View>
      </View>
    ));

  const list = BOList.map((bo, index) => (
    <View style={[styles.listContainer]}>
      <View style={[styles.header]}>
        <Text style={[styles.headerTitle]}>{bo}</Text>
        {enableAddButton && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BO_Setting_Add_User', {
                backOffice: bo,
                userList: userList[index],
              })
            }>
            <Text style={[styles.addButton]}>추가 ></Text>
          </TouchableOpacity>
        )}
      </View>
      <Card style={[styles.card]}>{userListComp(index)}</Card>
    </View>
  ));
  return <View>{list}</View>;
}

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 12,
  },
  card: {
    backgroundColor: globalStyles.color.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    color: globalStyles.color.grayDark,
  },
  addButton: {
    fontFamily: globalStyles.font.bold,
    fontSize: 13,
    color: globalStyles.color.blue,
  },
  user: {
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    color: globalStyles.color.text,
  },
  listItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  userContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: globalStyles.color.purple,
    marginRight: 12,
  },
  separatorPadding: {
    paddingLeft: 54,
  },
  separator: {
    color: globalStyles.color.grayLight,
  },
});

export default SettingBOList;
