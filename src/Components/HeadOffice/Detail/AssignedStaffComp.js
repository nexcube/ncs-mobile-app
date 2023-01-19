import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import apiAssignedInfo from '../../../services/api/assigned/info';
import globalStyles from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-paper';

function AssignedStaffComp({
  staffId,
  title = '지정 담당자',
  isChange = true,
  onChange,
  isIncludeTitle = true,
  cardMode = 'elevated',
}) {
  const [staff, setStaff] = useState({});

  useEffect(() => {
    apiAssignedInfo(staffId).then(data => {
      setStaff(data);
      // console.log(staffId, '---------------------------------------------------------');
      // console.log(JSON.stringify(data, null, '\t'));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId]);

  return (
    <View>
      {isIncludeTitle && (
        <View style={[styles.container]}>
          <Text style={[styles.assignedTitle]}>{title}</Text>
          {isChange && (
            <TouchableOpacity onPress={onChange}>
              <Text style={[styles.changeTitle]}>변경 ></Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Card style={[styles.cardContainer]} mode={cardMode}>
        <Card.Title
          style={[styles.card]}
          title={' ' + staff?.staffName + ' ' + staff?.dutyName}
          titleStyle={styles.title}
          titleVariant="labelLarge"
          subtitle={'  ' + staff?.departName + '∙' + staff?.positionName}
          subtitleStyle={styles.subTitle}
          left={props => (
            <View style={[styles.iconContainer]}>
              <Icon name="user" size={30} color={globalStyles.color.white} />
            </View>
          )}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  assignedTitle: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    fontWeight: '900',
    color: globalStyles.color.grayDark,
  },
  changeTitle: {
    fontFamily: globalStyles.font.bold,
    fontSize: 13,
    fontWeight: '900',
    color: globalStyles.color.blue,
  },
  cardContainer: {
    backgroundColor: globalStyles.color.white,
  },
  card: {
    paddingRight: 12,
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
});

export default AssignedStaffComp;
