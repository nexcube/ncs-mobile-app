import React from 'react';
import {StyleSheet, Text, Pressable, Platform, Image} from 'react-native';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';

function HeaderBackButton({onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [Platform.OS === 'ios' && pressed && {opacity: 0.5}]}
      android_ripple={{
        color: globalStyles.color.white,
      }}>
      <Image style={[styles.image]} source={require('../../../assets/images/chevron-left.png')} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
});

export default HeaderBackButton;
