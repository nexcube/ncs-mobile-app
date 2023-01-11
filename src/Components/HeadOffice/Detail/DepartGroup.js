import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, List} from 'react-native-paper';
import {useEffect} from 'react/cjs/react.development';
import apiAssignedDepartStaffs from '../../../services/api/assigned/departStaffs';
import apiAssignedInfo from '../../../services/api/assigned/info';
import globalStyles from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import UserContext from '../../../services/context/UserContext';
import {useNavigation} from '@react-navigation/native';
import apiInquiryUpdateAssigned from '../../../services/api/inquiry/updateAssigned';

function DepartGroup({idx, name, isIncludeRetire, setStaffCount, searchString, inquiryItem}) {
  const navigation = useNavigation();
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    setStaffs([]);
    apiAssignedDepartStaffs(idx, isIncludeRetire).then(async data => {
      const result = data.map(item => item.staffId);
      setStaffCount(prev => prev + result.length);

      for (const staffId of result) {
        let info = await apiAssignedInfo(staffId);

        const found = data.find(v => v.staffId === staffId);
        // 퇴사자 정보 주입
        if (found) {
          const date = new Date(found.outDate);
          const now = new Date();

          info = {...info, isRetire: date < now};
        }
        setStaffs(prev => [...prev, info]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIncludeRetire]);

  const onPressCard = staff => {
    // apiAssignedRegisterCategoryWatchStaff(categoryIndex, staff.staffId, User.staffId, onSuccess);
    apiInquiryUpdateAssigned(inquiryItem.idx, staff.staffId, onSuccess);
  };

  const onSuccess = (staffId, data) => {
    // navigation.goBack();
    inquiryItem.assignedStaffId = staffId;
    navigation.navigate({name: 'HO_Detail_Assigned_Info', params: inquiryItem, merge: true});
  };

  const cardList = () => {
    if (staffs?.length > 0) {
      const datas =
        searchString?.length > 0 ? staffs.filter(v => v.staffName.includes(searchString)) : staffs;

      return datas.map((staff, index) => (
        <TouchableOpacity key={index} onPress={() => onPressCard(staff)}>
          <Card>
            <Card.Title
              key={index}
              style={[styles.card]}
              title={' ' + staff?.staffName + ' ' + staff?.dutyName}
              titleStyle={styles.title}
              titleVariant="labelLarge"
              subtitle={'  ' + staff?.departName + '∙' + staff?.positionName}
              subtitleStyle={styles.subTitle}
              left={props => (
                <View style={[styles.iconContainer]} {...props}>
                  <Icon name="user" size={30} color={globalStyles.color.white} />
                </View>
              )}
              right={props => staff.isRetire && <Text style={[styles.retireText]}>퇴사</Text>}
            />
          </Card>
        </TouchableOpacity>
      ));
    } else {
      return null;
    }
  };

  const count = () => {
    if (staffs?.length > 0) {
      if (searchString?.length > 0) {
        return staffs.filter(v => v.staffName.includes(searchString)).length;
      } else {
        return staffs.length;
      }
    } else {
      return 0;
    }
  };

  return (
    <List.Accordion
      key={idx}
      // left={props => (
      //   <Text style={[styles.titleStyle]} {...props}>
      //     {name}
      //   </Text>
      // )}
      title={name + ' ' + count()}
      id={idx}
      style={[styles.container]}
      titleStyle={[styles.titleStyle]}>
      {cardList()}
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.background,
  },
  titleStyle: {
    paddingLeft: 12,
    color: globalStyles.color.text,
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    fontWeight: '500',
  },
  count: {
    color: globalStyles.color.gray,
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    fontWeight: '500',
  },

  card: {
    backgroundColor: globalStyles.color.white,
  },

  title: {
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    fontWeight: '700',
    color: globalStyles.color.text,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: globalStyles.color.purple,
    alignItems: 'center',
  },
  subTitle: {
    fontFamily: globalStyles.font.bold,
    fontSize: 13,
    fontWeight: '600',
    color: globalStyles.color.gray,
  },
  separator: {
    height: 10,
    backgroundColor: globalStyles.color.red,
    marginHorizontal: 15,
    marginVertical: 8,
  },
  retireText: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    fontWeight: '500',
    color: globalStyles.color.gray,
    paddingRight: 12,
  },
});

export default DepartGroup;
