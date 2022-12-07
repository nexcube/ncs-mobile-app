import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export function AttachmentFileFrame({index, item, onDelete, imageWidth}) {
  return (
    <View key={`file_${index}`}>
      <View width={imageWidth} style={[styles.image, {width: imageWidth, height: imageWidth}]}>
        <Icon name="file" size={32} />
        <Text style={[styles.text]} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onDelete(item)}
        activeOpacity={0.9}
        style={styles.buttonDelete}>
        <Icon name="x" size={20} color={globalStyles.color.grayLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    marginLeft: 6,
    marginBottom: 6,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: globalStyles.color.grayLight,
    alignItems: 'center',
    paddingVertical: 25,
  },
  buttonDelete: {
    padding: 4,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  text: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 22,
  },
});

export default AttachmentFileFrame;
