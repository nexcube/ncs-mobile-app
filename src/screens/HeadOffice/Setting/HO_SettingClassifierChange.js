import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Divider, List} from 'react-native-paper';
import SelectionButton from '../../../components/common/SelectionButton';
import {
  VerticalSpace12,
  VerticalSpace24,
  VerticalSpace6,
} from '../../../components/common/VerticalSpace';
import apiCategoryListByAssigned from '../../../services/api/category/listByAssigned';
import apiCategoryListByWatch from '../../../services/api/category/listByWatch';
import globalStyles from '../../../styles/globalStyles';
import ClassifyItem from '../../../components/HeadOffice/Setting/ClassifyItem';
import apiCommonChangeStaffAll from '../../../services/api/common/changeStaffAll';
import apiAssignedInfo from '../../../services/api/assigned/info';

function HO_SettingClassifierChange({navigation, route}) {
  const assigned = route.params?.newAssigned;
  const receiver = route.params?.receiver;
  const [assignedInfo, setAssignedInfo] = useState({});
  const [receiverInfo, setReceiverInfo] = useState({});
  const [listAssigned, setListAssigned] = useState([]);
  const [listWatch, setListWatch] = useState([]);

  // 상단 메뉴
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressComplete}>
          <Text style={[styles.complete]}>완료</Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedInfo, receiverInfo]);

  useEffect(() => {
    apiAssignedInfo(assigned).then(data => {
      setAssignedInfo(data);
    });

    apiCategoryListByAssigned(assigned).then(data => {
      setListAssigned(data);
    });

    apiCategoryListByWatch(assigned).then(data => {
      setListWatch(data);
    });
  }, [assigned]);

  useEffect(() => {
    apiAssignedInfo(receiver).then(data => {
      setReceiverInfo(data);
    });
  }, [receiver]);

  const onPressComplete = async () => {
    console.log('onPressComplete');
    if (assignedInfo && receiverInfo) {
      apiCommonChangeStaffAll(assignedInfo.staffId, receiverInfo.staffId, onSuccessChange);
    } else {
      // console.log(JSON.stringify(assignedInfo, null, '\t'));
      // console.log(JSON.stringify(receiverInfo, null, '\t'));
      Alert.alert('주의', '인계할 담당자와 인계 받을 담당자를 선택해 주세요', [
        {text: 'OK', onPress: () => null},
      ]);
    }
  };

  const onSuccessChange = async data => {
    navigation.goBack();
  };

  const onPressAssigned = () => {
    navigation.navigate('HO_Detail_Assigned_Search', {
      customData: {
        returnRouter: 'HO_Setting_Classifier_Change',
        type: 'selectAssignedStaff',
      },
    });
  };

  const onPressReceiver = () => {
    navigation.navigate('HO_Detail_Assigned_Search', {
      customData: {
        returnRouter: 'HO_Setting_Classifier_Change',
        type: 'selectReceiveStaff',
      },
    });
  };

  const assignedText = assigned
    ? `${assignedInfo?.departName} | ${assignedInfo?.staffName} ${assignedInfo?.dutyName}`
    : '선택';
  const receiverText = receiver
    ? `${receiverInfo?.departName} | ${receiverInfo?.staffName} ${receiverInfo?.dutyName}`
    : '선택';

  return (
    <View style={[styles.fullscreen]}>
      <VerticalSpace24 />
      <View style={[styles.senderContainer]}>
        <Text style={[styles.senderTitle]}>인계할 담당자</Text>
        <VerticalSpace6 />
        <SelectionButton title={assignedText} onPress={onPressAssigned} style={styles.assigned} />
      </View>
      <VerticalSpace24 />
      <View style={[styles.receiverContainer]}>
        <Text style={[styles.receiverTitle]}>인계받을 담당자</Text>
        <VerticalSpace6 />
        <SelectionButton title={receiverText} onPress={onPressReceiver} style={styles.assigned} />
        <TextInput />
      </View>
      <VerticalSpace24 />
      <Divider />
      <VerticalSpace24 />
      {assigned && (
        <>
          <View style={[styles.bottomHeader]}>
            <Text style={[styles.bottomHeaderTitle]}>인계할 담당자 키워드 분류</Text>
            <VerticalSpace6 />
            <Text
              style={[
                styles.bottomHeaderName,
              ]}>{`${assignedInfo?.staffName} ${assignedInfo?.dutyName}`}</Text>
          </View>
          <VerticalSpace12 />
          <ScrollView alwaysBounceVertical={false}>
            <List.Accordion
              title={
                <>
                  <Text style={[styles.listAssignedContainerText]}>담당자로 지정된 분류 </Text>
                  <Text style={[styles.listAssignedContainerCount]}>{listAssigned.length}</Text>
                </>
              }
              style={[styles.listAssignedContainer]}>
              {listAssigned.map((item, index) => (
                <ClassifyItem
                  key={index}
                  title={item.qnaCatName}
                  staffName={item.staffName}
                  staffTeam={item.departName}
                  staffPosition={item.dutyName}
                  watcherCount={item.watcherCount}
                  inquiryCount={item.inquiryCount}
                  onSelect={() => null}
                />
              ))}
            </List.Accordion>
            <List.Accordion
              title={
                <>
                  <Text style={[styles.listAssignedContainerText]}>참관자 지정된 분류 </Text>
                  <Text style={[styles.listAssignedContainerCount]}>{listWatch.length}</Text>
                </>
              }
              style={[styles.listAssignedContainer]}>
              {listWatch.map((item, index) => (
                <ClassifyItem
                  key={index}
                  title={item.qnaCatName}
                  staffName={item.staffName}
                  staffTeam={item.departName}
                  staffPosition={item.dutyName}
                  watcherCount={item.watcherCount}
                  inquiryCount={item.inquiryCount}
                  onSelect={() => null}
                />
              ))}
            </List.Accordion>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomHeader: {
    alignItems: 'center',
  },
  bottomHeaderTitle: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    fontWeight: '900',
    color: globalStyles.color.grayDark,
  },
  bottomHeaderName: {
    fontFamily: globalStyles.font.regular,
    fontSize: 22,
    fontWeight: '900',
    color: globalStyles.color.text,
  },

  fullscreen: {
    flex: 1,
  },
  complete: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    fontWeight: '500',
    color: globalStyles.color.white,
  },
  senderContainer: {
    paddingHorizontal: 12,
  },
  senderTitle: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '900',
    fontSize: 15,
    color: globalStyles.color.grayDark,
    paddingHorizontal: 6,
  },
  receiverContainer: {
    paddingHorizontal: 12,
  },
  receiverTitle: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '900',
    fontSize: 15,
    color: globalStyles.color.grayDark,
    paddingHorizontal: 6,
  },
  assigned: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '400',
    fontSize: 15,
    color: globalStyles.color.text,
  },
  listAssignedContainer: {
    backgroundColor: globalStyles.color.background,
  },
  listAssignedContainerText: {
    color: globalStyles.color.text,
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    fontWeight: '700',
  },
  listAssignedContainerCount: {
    color: globalStyles.color.gray,
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    fontWeight: '500',
  },
});

export default HO_SettingClassifierChange;
