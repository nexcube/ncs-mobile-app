import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import apiSettingQnaAccessUserRegister from '../../../services/api/setting/qnaAccessUser/register';
import globalStyles from '../../../styles/global';

function BO_SettingAddUser({navigation, route}) {
  const backOfficeName = route.params.backOffice;
  const branchStaffs = route.params.branchStaffs;

  const onPressAdd = index => {
    apiSettingQnaAccessUserRegister(
      branchStaffs[index].staffId,
      branchStaffs[index].facilityCode,
      onSuccess,
    );
  };

  const onSuccess = () => {
    navigation.goBack();
  };

  const userListComp = () =>
    branchStaffs.map((user, index) => (
      <View key={index}>
        <TouchableOpacity style={[styles.listItem]} onPress={() => onPressAdd(index)}>
          <View style={[styles.iconContainer]}>
            <Icon name="user" size={30} color={globalStyles.color.white} />
          </View>

          <View style={[styles.userContainer]}>
            <Text style={[styles.user]}>{user.staffName}</Text>
            <Text style={[styles.rankName]}> {user.rankName}</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.separatorPadding]}>
          {index !== branchStaffs.length - 1 ? <Divider style={[styles.separator]} /> : null}
        </View>
      </View>
    ));

  return (
    <View style={[styles.fullscreen]}>
      <View style={[styles.header]}>
        <Text style={[styles.headerTitle]}>{backOfficeName}점</Text>
      </View>
      <Card style={[styles.card]}>{userListComp()}</Card>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    paddingHorizontal: 18,
  },

  card: {
    backgroundColor: globalStyles.color.white,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    color: globalStyles.color.grayDark,
  },

  listItem: {
    paddingHorizontal: 12,
    padding: 12,
    flexDirection: 'row',
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: globalStyles.color.purple,
    marginRight: 12,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  user: {
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    color: globalStyles.color.text,
  },
  rankName: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: globalStyles.color.text,
  },
  separatorPadding: {
    paddingLeft: 54,
  },
  separator: {
    color: globalStyles.color.grayLight,
  },
});

export default BO_SettingAddUser;
