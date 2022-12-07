import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import AttachmentImageFrame from './AttachmentImage';
import {AttachmentFileFrame} from './AttachmentFile';

const {width} = Dimensions.get('window');
export const IMAGE_WIDTH = (width - 24 - 18 - 6) / 4;

function Attachments({images, files, cameras, onDeleteImage, onDeleteFile, onDeleteCamera}) {
  return (
    <View style={[styles.container]}>
      {/* 이미지 표현 */}
      {images.map((item, index) => (
        <AttachmentImageFrame
          index={index}
          item={item}
          onDelete={onDeleteImage}
          imageWidth={IMAGE_WIDTH}
        />
      ))}
      {/* 카메라 이미지 표현 */}
      {cameras.map((item, index) => (
        <AttachmentImageFrame
          index={index}
          item={item}
          onDelete={onDeleteCamera}
          imageWidth={IMAGE_WIDTH}
          isCamera={true}
        />
      ))}
      {/* 파일 표현 */}
      {files.map((item, index) => (
        <AttachmentFileFrame
          index={index}
          item={item}
          onDeleteFile={onDeleteFile}
          imageWidth={IMAGE_WIDTH}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Attachments;
