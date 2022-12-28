import React from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import Attachment from './Attachment';

const {width} = Dimensions.get('window');
export const IMAGE_WIDTH = (width - 24 - 18 - 6) / 4;

function Attachments({attachments = [], setAttachments, setSpinner, isShowDelete = true}) {
  // console.log('Attachments :', attachments);
  const onDelete = isShowDelete
    ? value => {
        const result = attachments.filter(item => item?.path && item.path !== value.path);
        setAttachments(result);
      }
    : null;

  return (
    <ScrollView horizontal>
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
    </ScrollView>
  );
}

export default Attachments;
