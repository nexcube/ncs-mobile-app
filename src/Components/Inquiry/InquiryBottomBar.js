import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/global';

const InquiryBottomBar = ({onImage, onFile, onCamera}) => {
  return (
    <View style={[styles.bottomBar]}>
      <Icon
        name="image"
        size={20}
        color={globalStyles.color.gray}
        style={[styles.icon]}
        onPress={onImage}
      />
      <Icon
        name="file"
        size={20}
        color={globalStyles.color.gray}
        style={[styles.icon]}
        onPress={onFile}
      />
      <Icon
        name="camera"
        size={20}
        color={globalStyles.color.gray}
        style={[styles.icon]}
        onPress={onCamera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    width: '100%',
    backgroundColor: globalStyles.color.white,
  },
  icon: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default InquiryBottomBar;
