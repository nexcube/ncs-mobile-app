import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Attachment from './Attachment';

const {width} = Dimensions.get('window');
export const IMAGE_WIDTH = (width - 24 - 18 - 6) / 4;

function Attachments({attachments = [], setAttachments, setSpinner}) {
  // console.log('Attachments :', attachments);
  const onDelete = value => {
    const result = attachments.filter(item => item?.path && item.path !== value.path);
    setAttachments(result);
  };

  return (
    <View style={[styles.container]}>
      {attachments.map((item, index) => (
        <Attachment
          setSpinner={setSpinner}
          key={`attachment_${index}`}
          index={index}
          item={item}
          onDelete={onDelete}
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
  test: {
    backgroundColor: 'red',
  },
});

export default Attachments;
