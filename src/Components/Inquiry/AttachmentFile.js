import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';

export function AttachmentFileFrame({index, item, onDelete, imageWidth}) {
  return (
    <View key={`file_${index}`}>
      <View width={imageWidth} style={[styles.image, {width: imageWidth, height: imageWidth}]}>
        <Text style={[styles.text]}>{item.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onDelete(item)}
        activeOpacity={0.9}
        style={styles.buttonDelete}>
        <Icon name="x" size={20} color={globalStyles.color.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    marginLeft: 6,
    marginBottom: 6,
    backgroundColor: 'rgba(0,255,0,0.2)',
    borderRadius: 6,
    borderColor: 'green',
    borderWidth: 2,
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
    padding: 15,
  },
});

export default AttachmentFileFrame;
