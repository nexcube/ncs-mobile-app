import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

function HO_Detail({navigation, route}) {
  const onDetailImageViewer = function () {
    navigation.navigate('HO_Detail_Image_Viewer');
  };

  const onDetailAddComment = function () {
    navigation.navigate('HO_Detail_Add_Comment');
  };

  const onDetailClassifierInfo = () => navigation.navigate('HO_Detail_Classifier_Info');

  return (
    <View style={[styles.fullscreen]}>
      <Text>Head Office Detail</Text>
      <View>
        <Button title="첨부 이미지 보기" onPress={onDetailImageViewer} />
        <Button title="분류담당자 상세 정보" onPress={onDetailClassifierInfo} />
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
