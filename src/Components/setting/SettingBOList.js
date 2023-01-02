import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import apiSettingQnaAccessUserRemove from '../../services/api/setting/qnaAccessUser/remove';

function SettingBOList({
  branchList,
  branchStaffs,
  branchStaffsRefined,
  setRefresh,
  enableAddButton = true,
}) {
  // console.log(branchStaffsL10);
  const navigation = useNavigation();

  const onPressRemove = (facilityCode, staffId) => {
    apiSettingQnaAccessUserRemove(staffId, facilityCode, onSuccessRemove);
  };

  const onSuccessRemove = () => {
    console.log('삭제됨');
    setRefresh(prev => !prev);
  };

  const userListComp = idx => {
    if (!branchStaffsRefined[idx]) {
      return;
    }

    return branchStaffsRefined[idx].map((user, index) => (
      <View key={index}>
        <View style={[styles.listItem]}>
          <View style={[styles.iconContainer]}>
            <Icon name="user" size={30} color={globalStyles.color.white} />
          </View>
          <View style={[styles.userContainer]}>
            <View style={[styles.user]}>
              <Text style={[styles.userName]}>{user.staffName}</Text>
              <Text style={[styles.rankName]}> {user.rankName}</Text>
            </View>
            {user.rankCode !== 'L10' && (
              <TouchableOpacity onPress={() => onPressRemove(user.facilityCode, user.staffId)}>
                <Text style={[styles.removeButton]}> 삭제</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={[styles.separatorPadding]}>
          {index !== branchStaffsRefined[idx].length - 1 ? (
            <Divider style={[styles.separator]} />
          ) : null}
        </View>
      </View>
    ));
  };

  const onPressAdd = (bo, index) => {
    const notAddedStaff = branchStaffs[index].filter(
      staff => !branchStaffsRefined[index].includes(staff),
    );
    navigation.navigate('BO_Setting_Add_User', {
      backOffice: bo,
      branchStaffs: notAddedStaff,
    });
  };
  const list =
    branchList.length > 0
      ? branchList.map((bo, index) => (
          <View key={index} style={[styles.listContainer]}>
            <View style={[styles.header]}>
              <Text style={[styles.headerTitle]}>{bo}점</Text>
              {enableAddButton && (
                <TouchableOpacity onPress={() => onPressAdd(bo, index)}>
                  <Text style={[styles.addButton]}>추가 ></Text>
                </TouchableOpacity>
              )}
            </View>
            <Card style={[styles.card]}>{userListComp(index)}</Card>
          </View>
        ))
      : null;
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

  listItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: globalStyles.color.purple,
    marginRight: 12,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  user: {
    flexDirection: 'row',
  },
  userName: {
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    color: globalStyles.color.text,
  },
  rankName: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: globalStyles.color.text,
  },
  removeButton: {
    fontFamily: globalStyles.font.bold,
    fontSize: 13,
    color: globalStyles.color.red,
  },
  separatorPadding: {
    paddingLeft: 54,
  },
  separator: {
    color: globalStyles.color.grayLight,
  },
});

export default SettingBOList;
