import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

function HO_Detail({navigation, route}) {
  const onDetailModify = function () {
    navigation.navigate('HO_Detail_Modify');
  };

  const onDetailImageViewer = function () {
    navigation.navigate('HO_Detail_Image_Viewer');
  };

  const onDetailAddComment = function () {
    navigation.navigate('HO_Detail_Add_Comment');
  };

  return (
    <View style={[styles.fullscreen]}>
      <Text>Head Office Detail</Text>
      <View>
        <Button title="첨부 이미지 보기" onPress={onDetailImageViewer} />
        <Button title="수정하기" onPress={onDetailModify} />
        <Button title="댓글달기" onPress={onDetailAddComment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HO_Detail;
