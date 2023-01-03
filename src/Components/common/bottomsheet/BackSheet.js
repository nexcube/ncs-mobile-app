import React from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import CustomButton from '../CustomButton';

const BackSheet = ({onOk, onCancel}) => {
  return (
    <View style={[styles.container]}>
      <CustomButton
        title="내용 삭제하고 뒤로"
        onPress={onOk}
        hasMarginBottom
        backgroundColor={globalStyles.color.red}
      />
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

export default BackSheet;
