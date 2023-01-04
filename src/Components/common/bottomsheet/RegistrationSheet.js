import React from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import CustomButton from '../CustomButton';

const RegistrationSheet = ({onOk, onCancel}) => {
  return (
    <View style={[styles.container]}>
      <CustomButton title="등록 확인" onPress={onOk} hasMarginBottom />
      <CustomButton
        title="계속 작성"
        onPress={onCancel}
        hasMarginBottom
        fontColor={globalStyles.color.blue}
        backgroundColor={globalStyles.color.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
});

export default RegistrationSheet;
