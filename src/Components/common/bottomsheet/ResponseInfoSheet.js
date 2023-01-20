import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import CustomButton from '../CustomButton';

const ResponseInfoSheet = ({onOk, onCancel}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.headerText]}>평균 응답 시간</Text>
      <View style={[styles.textContainer]}>
        <Text style={[styles.text]}>
          신규 등록된 문의에 첫 댓글이 달릴 때까지 지난 7일간의 평균 시간입니다.
        </Text>
      </View>
      <CustomButton title="확인" onPress={onOk} hasMarginBottom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  headerText: {
    fontFamily: globalStyles.font.title,
    color: globalStyles.color.text,
    fontSize: 15,
    textAlign: 'center',
  },
  textContainer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  text: {
    fontFamily: globalStyles.font.regular,
    color: globalStyles.color.text,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ResponseInfoSheet;
