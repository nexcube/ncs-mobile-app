import React from 'react';
import {StyleSheet, Text, Pressable, Platform} from 'react-native';
import globalStyles from '../../styles/globalStyles';

function HeaderButton({title, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.wrapper, Platform.OS === 'ios' && pressed && {opacity: 0.5}]}
      android_ripple={{
        color: globalStyles.color.white,
      }}>
      <Text style={[styles.text]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: globalStyles.color.white,
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
  },
});

export default HeaderButton;
