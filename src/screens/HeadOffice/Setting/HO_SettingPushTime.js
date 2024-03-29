import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';

import SelectDropdown from 'react-native-select-dropdown';
import DayOfWeekToggleButton from '../../../components/common/Setting/DayOfWeekToggleButton';
import {VerticalSpace12} from '../../../components/common/VerticalSpace';
import globalStyles from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

import UserContext from '../../../services/context/UserContext';
import apiCommonGetUserInfo from '../../../services/api/common/getUserInfo';
import apiCommonUpdateUserInfo from '../../../services/api/common/updateUserInfo';
import userData from '../../../services/storage/DeviceStorage';
import {
  alarmDayOfWeeksName,
  alarmEndIndexName,
  alarmStartIndexName,
} from '../../../services/config';

function HO_SettingPushTime({navigation, route}) {
  const [startAlarmIndex, setStartAlarmIndex] = useState(0);
  const [endAlarmIndex, setEndAlarmIndex] = useState(0);
  const [dayOfWeeks, setDayOfWeeks] = useState(initDayOfWeeks);

  const [User, ,] = useContext(UserContext, onSuccess);

  useEffect(() => {
    apiCommonGetUserInfo(User.staffId, onSuccess);
  }, [User.staffId]);

  const onSuccess = async data => {
    const alarmObject = JSON.parse(data.alarmTime);
    setStartAlarmIndex(alarmObject.startIndex);
    setEndAlarmIndex(alarmObject.endIndex);
    setDayOfWeeks(alarmObject.dayOfWeeks);
  };

  useEffect(() => {
    return onSave;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOfWeeks, startAlarmIndex, endAlarmIndex]);

  const onSave = () => {
    // console.log('onSave:', dayOfWeeks);
    apiCommonUpdateUserInfo(User.staffId, {
      startIndex: startAlarmIndex,
      endIndex: endAlarmIndex,
      dayOfWeeks,
    });
  };

  return (
    <View style={[styles.screen]}>
      <Text style={[styles.subject]}>요일 설정</Text>
      <View style={[styles.dayOfWeek]}>
        {Object.entries(dayOfWeeks).map(([key, value]) => (
          <DayOfWeekToggleButton
            key={key}
            title={key}
            checked={value}
            setChecked={() => {
              setDayOfWeeks(prev => {
                prev[key] = !prev[key];
                const newClass = {...prev};
                userData.setItem(alarmDayOfWeeksName, newClass);
                return newClass;
              });
            }}
          />
        ))}
      </View>
      <Text style={[styles.info]}>지정된 요일의 설정된 시간내에만 푸시알림을 받습니다.</Text>
      <VerticalSpace12 />
      <Divider />
      <VerticalSpace12 />
      <Text style={[styles.subject]}>알림 시작 시간</Text>
      <SelectDropdown
        defaultValue={timeIntervals[startAlarmIndex]}
        disableAutoScroll={true}
        defaultButtonText={timeIntervals[0]}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        data={timeIntervals}
        onSelect={(selectedItem, index) => {
          userData.setItem(alarmStartIndexName, index);
          setStartAlarmIndex(index);
        }}
        renderDropdownIcon={isOpened => {
          return (
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={globalStyles.color.gray}
              size={18}
            />
          );
        }}
        dropdownStyle={styles.dropdownStyle}
        rowTextStyle={styles.rowTextStyle}
        statusBarTranslucent={true}
      />
      <VerticalSpace12 />
      <Text style={[styles.subject]}>알림 종료 시간</Text>
      <SelectDropdown
        defaultValue={timeIntervals[endAlarmIndex]}
        disableAutoScroll={true}
        defaultButtonText={timeIntervals[endAlarmIndex]}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        data={timeIntervals}
        onSelect={(selectedItem, index) => {
          userData.setItem(alarmEndIndexName, index);
          setEndAlarmIndex(index);
        }}
        renderDropdownIcon={isOpened => {
          return (
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={globalStyles.color.gray}
              size={18}
            />
          );
        }}
        dropdownStyle={styles.dropdownStyle}
        rowTextStyle={styles.rowTextStyle}
        statusBarTranslucent={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {padding: 12},
  dayOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  subject: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    color: globalStyles.color.grayDark,
    margin: 10,
  },
  info: {
    padding: 12,
    fontFamily: globalStyles.font.regular,
    fontWeight: '600',
    fontSize: 13,
    color: globalStyles.color.grayDark,
  },
  buttonStyle: {
    backgroundColor: globalStyles.color.white,
    borderRadius: 6,
    height: 48,
    width: '100%',
  },
  buttonTextStyle: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '500',
    fontSize: 15,
    color: globalStyles.color.text,
    textAlign: 'left',
  },
  dropdownStyle: {
    backgroundColor: globalStyles.color.white,
    borderRadius: 6,
  },
  rowTextStyle: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '500',
    fontSize: 15,
    color: globalStyles.color.text,
    textAlign: 'left',
    paddingLeft: 12,
  },
});

const initDayOfWeeks = {
  월: true,
  화: true,
  수: true,
  목: true,
  금: true,
  토: true,
  일: true,
};

const timeIntervals = new Array(49).fill(0).map((value, index) => {
  const hour = Math.floor(index / 2);
  return `${String(hour).padStart(2, '0')} : ${index % 2 ? '30' : '00'}`;
});

export default HO_SettingPushTime;
