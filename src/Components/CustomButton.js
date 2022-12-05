import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';

function CustomButton({onPress, title, hasMarginBottom}) {
  return (
    <View style={[styles.block, styles.overflow, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.wrapper, Platform.OS === 'ios' && pressed && {opacity: 0.5}]}
        android_ripple={{
          color: '#ffffff',
        }}>
        <Text style={[styles.text]}>{title}</Text>
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
    backgroundColor: '#0067CC',
  },
  text: {
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 17,
    color: 'white',
  },
  margin: {
    marginBottom: 8,
  },
});

export default CustomButton;
