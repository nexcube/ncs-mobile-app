import React from 'react';
import {StyleSheet, View, Pressable, Platform, Text, Image} from 'react-native';
import globalStyles from '../../styles/global';

function SelectionButton({hasMarginBottom, onPress, title, ...rest}) {
  return (
    <View style={[styles.container, hasMarginBottom && styles.margin]}>
      <Pressable
        // disabled={true}
        onPress={onPress}
        style={({pressed}) => [styles.wrapper, Platform.OS === 'ios' && pressed && {opacity: 0.5}]}
        android_ripple={{color: globalStyles.color.white}}>
        <Text style={[styles.text]} disabled={true}>
          {title}
        </Text>
        <Image
          source={require('../../../assets/images/chevron-right.png')}
          style={[styles.image]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: globalStyles.color.grayLight,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: globalStyles.color.white,
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5,
  },
  text: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    color: '#C7C7CD',
  },
  image: {
    width: 16,
    height: 16,
  },
  margin: {
    marginBottom: 16,
  },
});

export default SelectionButton;
