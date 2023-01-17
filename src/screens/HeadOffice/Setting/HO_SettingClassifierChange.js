import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import CustomButton from '../../../components/common/CustomButton';
import SelectionButton from '../../../components/common/SelectionButton';
import {VerticalSpace24, VerticalSpace6} from '../../../components/common/VerticalSpace';
import globalStyles from '../../../styles/globalStyles';

function HO_SettingClassifierChange({navigation, route}) {
  const assigned = route.params.assigned;
  console.log(assigned);
  const onClassifyDetail = () => navigation.navigate('HO_Classify_Detail');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressComplete}>
          <Text style={[styles.complete]}>저장</Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressComplete = () => {
    console.log('onPressComplete');
  };

  return (
    <View style={[styles.fullscreen]}>
      <VerticalSpace24 />
      <View style={[styles.senderContainer]}>
        <Text style={[styles.senderTitle]}>인계할 담당자</Text>
        <VerticalSpace6 />
        <SelectionButton
          title={`${assigned.departName} | ${assigned.staffName} ${assigned.dutyName}`}
          onPress={() => null}
          style={styles.assigned}
        />
      </View>
      <VerticalSpace24 />
      <View style={[styles.receiverContainer]}>
        <Text style={[styles.receiverTitle]}>인계받을 담당자</Text>
        <VerticalSpace6 />
        <SelectionButton title="ddd" onPress={() => null} style={styles.assigned} />
        <TextInput />
      </View>
      <VerticalSpace24 />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default HO_SettingClassifierChange;
