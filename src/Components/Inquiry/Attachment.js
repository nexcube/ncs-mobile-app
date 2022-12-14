import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Platform, Text} from 'react-native';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';

function Attachment({index, item, onDelete, imageWidth}) {
  return (
    <View>
      {item.type.includes('image') ? (
        <Image
          source={{uri: item.path}}
          style={[styles.image, {width: imageWidth, height: imageWidth}]}
        />
      ) : (
        <View
          width={imageWidth}
          style={[styles.fileImage, {width: imageWidth, height: imageWidth}]}>
          <Icon name="file" size={24} color={globalStyles.color.grayLight} />
          <Text style={[styles.text]} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => onDelete(item)}
        activeOpacity={0.9}
        style={styles.buttonDelete}>
        <Icon name="x" size={20} color={globalStyles.color.gray} />
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
  fileImage: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 6,
    marginBottom: 6,
    backgroundColor: globalStyles.color.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: globalStyles.color.grayLight,
    paddingVertical: 12,
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
    paddingHorizontal: 10,
  },
});

export default Attachment;
