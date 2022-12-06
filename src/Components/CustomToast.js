import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/global';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';

const CustomToast = () => <Toast config={toastConfig} />;

const toastConfig = {
  errorMsg: ({text1, props}) => (
    <View style={[styles.container]}>
      <Text style={[styles.toastText]} numberOfLines={3}>
        {props.message}
      </Text>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <Icon style={[styles.closeButton]} name="x" size={24} color="white" />
      </TouchableOpacity>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#B3261E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  toastText: {
    color: globalStyles.color.white,
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    marginRight: 15,
  },
  closeButton: {marginLeft: 15},
});

export default CustomToast;
export {Toast};
