import React from 'react';
import {View, Pressable, StyleSheet, Text, Platform} from 'react-native';
import globalStyles from '../../styles/global';

export default function ChoiceButton({title, onPress}) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.button, Platform.OS === 'ios' && pressed && {opacity: 0.5}]}
        android_ripple={{
          color: globalStyles.color.white,
        }}>
        <Text style={[styles.text]}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    backgroundColor: globalStyles.color.white,
    paddingHorizontal: 14,
    paddingVertical: 6,
    margin: 5,
  },
  text: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: globalStyles.color.text,
  },
});
