import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import globalStyles from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import {useCallback, useEffect, useState} from 'react/cjs/react.development';
import apiAssignedListCategoryWatchStaff from '../../../services/api/assigned/listCategoryWatchStaff';
import apiAssignedInfo from '../../../services/api/assigned/info';

function AssignedWatchComp({catIdx, isChange = false, onChange}) {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    setStaffs([]);
    apiAssignedListCategoryWatchStaff(catIdx).then(async data => {
      const result = data.map(v => v.staffId);

      for (const staffId of result) {
        const info = await apiAssignedInfo(staffId);
        setStaffs(prev => [...prev, info]);
      }
    });
  }, [catIdx]);

  const list = useCallback(() => {
    if (staffs.length > 0) {
      return staffs.map((staff, index) => (
        <View key={index}>
          <Card.Title
            key={index}
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
          {index < staffs.length - 1 && <View style={[styles.separator]} />}
        </View>
      ));
    } else {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catIdx, staffs]);

  return (
    <View>
      <View style={[styles.container]}>
        <Text style={[styles.assignedTitle]}>분류 참관자</Text>
        {isChange && (
          <TouchableOpacity onPress={onChange}>
            <Text style={[styles.changeTitle]}>추가 ></Text>
          </TouchableOpacity>
        )}
      </View>

      <Card style={[styles.cardContainer]} mode="elevated">
        {list()}
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

  separator: {
    width: '100%',
    height: 1,
    paddingLeft: 20,
    backgroundColor: globalStyles.color.separator,
  },
  changeTitle: {
    fontFamily: globalStyles.font.bold,
    fontSize: 13,
    fontWeight: '900',
    color: globalStyles.color.blue,
  },
});

export default AssignedWatchComp;
