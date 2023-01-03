import React from 'react';
import {StyleSheet, Pressable, Platform, Image, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';

function HeaderBackButton({onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        Platform.OS === 'ios' && pressed && {opacity: 0.5},
        globalStyles.backButtonPadding,
      ]}
      android_ripple={{
        color: globalStyles.color.white,
      }}>
      <Image style={[styles.image]} source={require('../../../assets/images/chevron-left.png')} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 10,
    height: 32,
  },
  padding: {
    paddingRight: 24,
    paddingVertical: 10,
  },
});

export default HeaderBackButton;
