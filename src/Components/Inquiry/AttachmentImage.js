import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';

function AttachmentImageFrame({index, item, onDelete, imageWidth, isCamera = false}) {
  const keyString = isCamera ? `camera_${index}` : `image_${index}`;
  return (
    <View key={keyString}>
      <Image
        source={{uri: item.path ?? item.uri}}
        style={[styles.image, {width: imageWidth, height: imageWidth}]}
      />
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
  },
  buttonDelete: {
    padding: 4,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default AttachmentImageFrame;
