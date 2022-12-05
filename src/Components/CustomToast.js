import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import globalStyles from '../styles/global';
import Toast from 'react-native-toast-message';

const CustomToast = () => <Toast config={toastConfig} />;

const toastConfig = {
  errorMsg: ({text1, props}) => (
    <View style={[styles.toast]}>
      <Text style={[styles.toastText]}>{props.message}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    borderRadius: 10,
    height: 87,
    width: '90%',
    backgroundColor: '#B3261E',
    padding: 20,
  },
  toastText: {
    color: globalStyles.color.white,
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
  },
});

export default CustomToast;
export {Toast};
