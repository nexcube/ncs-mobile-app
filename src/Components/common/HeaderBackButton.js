import React from 'react';
import {StyleSheet, Pressable, Platform, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {back} from 'react-native/Libraries/Animated/Easing';
import globalStyles from '../../styles/globalStyles';

function HeaderBackButton({onPress, color = globalStyles.color.white}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [Platform.OS === 'ios' && pressed && {opacity: 0.5}]}
      android_ripple={{
        color: globalStyles.color.white,
      }}>
      <Icon name="chevron-left" size={32} color={color} />
    </Pressable>
  );
}

export default HeaderBackButton;
