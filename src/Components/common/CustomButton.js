import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../../styles/global';

function CustomButton({
  onPress,
  title,
  hasMarginBottom,
  fontColor = globalStyles.color.white,
  backgroundColor = globalStyles.color.blue,
  ...restStyle
}) {
  console.log(restStyle);
  return (
    <View style={[styles.overflow, hasMarginBottom && styles.margin, restStyle['customStyle']]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          {backgroundColor: backgroundColor},
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{
          color: globalStyles.color.white,
        }}>
        <Text style={[styles.text, {color: fontColor}]}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.color.blue,
  },
  text: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: globalStyles.color.white,
  },
  margin: {
    marginBottom: 8,
  },
});

export default CustomButton;
