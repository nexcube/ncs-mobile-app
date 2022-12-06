import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import CustomButton from './CustomButton';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import BorderedInput from './BorderedInput';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');
const IMAGE_WIDTH = (width - 24 - 18 - 6) / 4;

const buttonData = `{"type":"button"}`;

function MultiImagePicker({images, setImages, onDelete}) {
  console.log(images);

  return (
    <View style={[styles.container]}>
      {images.map((item, index) =>
        item.type === 'image' || 'image/jpeg' ? (
          <View key={item.localIdentifier}>
            <Image
              width={IMAGE_WIDTH}
              source={{
                // uri:
                //   item?.type === 'video'
                //     ? item?.thumbnail ?? ''
                //     : 'file://' + (item?.crop?.cropPath ?? item.path),
                uri: item.path ?? item.uri,
              }}
              style={styles.image}
            />
            <TouchableOpacity
              onPress={() => onDelete(item)}
              activeOpacity={0.9}
              style={styles.buttonDelete}>
              <Icon name="x" size={20} color={globalStyles.color.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <Text>File</Text>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
  },
  buttonDelete: {
    padding: 4,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default MultiImagePicker;
