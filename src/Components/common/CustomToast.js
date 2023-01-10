import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';

const CustomToast = () => <Toast config={toastConfig} />;

const toastConfig = {
  errorMsg: ({props}) => (
    <View style={[styles.container]}>
      <Text style={[styles.toastText]} numberOfLines={3}>
        {props.message}
      </Text>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <Icon style={[styles.closeButton]} name="x" size={24} color="white" />
      </TouchableOpacity>
    </View>
  ),
  infoMsg: ({props}) => (
    <View style={[styles.containerInfo]}>
      <Text style={[styles.toastInfoText]} numberOfLines={3}>
        {props.message}
      </Text>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <Icon style={[styles.closeButton]} name="x" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  ),
};

const infoConfig = {};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#B3261E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  containerInfo: {
    borderRadius: 10,
    borderColor: globalStyles.color.text,
    borderWidth: 1,
    width: '90%',
    backgroundColor: globalStyles.color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  toastText: {
    flex: 1,
    color: globalStyles.color.white,
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    marginRight: 15,
  },
  toastInfoText: {
    flex: 1,
    color: globalStyles.color.text,
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    marginRight: 15,
  },
  closeButton: {marginLeft: 15},
});

export default CustomToast;
export {Toast, toastConfig as defaultConfig, infoConfig};
