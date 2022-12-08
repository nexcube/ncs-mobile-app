import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import AttachmentImageFrame from './AttachmentImage';
import {AttachmentFileFrame} from './AttachmentFile';

const {width} = Dimensions.get('window');
export const IMAGE_WIDTH = (width - 24 - 18 - 6) / 4;

function Attachments({images, setImages, files, setFiles, cameras, setCameras}) {
  const onDeleteImage = value => {
    const result = images.filter(item => item?.path && item?.path !== value?.path);
    setImages(result);
  };
  const onDeleteFile = value => {
    const result = files.filter(item => item?.uri && item?.uri !== value?.uri);
    setFiles(result);
  };

  const onDeleteCamera = value => {
    const result = cameras.filter(item => item?.uri && item?.uri !== value?.uri);
    setCameras(result);
  };

  return (
    <View style={[styles.container]}>
      {/* 이미지 표현 */}
      {images.map((item, index) => (
        <AttachmentImageFrame
          key={`imageFrame_${index}`}
          index={index}
          item={item}
          onDelete={onDeleteImage}
          imageWidth={IMAGE_WIDTH}
        />
      ))}
      {/* 카메라 이미지 표현 */}
      {cameras.map((item, index) => (
        <AttachmentImageFrame
          key={`cameraFrame_${index}`}
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
          key={`fileFrame_${index}`}
          index={index}
          item={item}
          onDelete={onDeleteFile}
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
