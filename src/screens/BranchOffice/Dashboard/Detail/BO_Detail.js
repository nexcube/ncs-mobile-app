import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import InquiryCard from '../../../../components/Inquiry/InquiryCard';
import globalStyles from '../../../../styles/global';
import Icon from 'react-native-vector-icons/Feather';
import TopMenu from '../../../../components/Detail/TopMenu';

function BO_Detail({navigation, route}) {
  const item = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <TopMenu />,
    });
  });
  return (
    <View style={[styles.fullscreen]}>
      <View style={[styles.header]}>
        <InquiryCard
          key={item.idx}
          title={item.title}
          content={item.content}
          mainCatName={item.mainCatName}
          subCatName={item.subCatName}
          branchOfficeName={item.branchOfficeName}
          inquirer={item.inquirer}
          levelName={item.levelName}
          updateDate={item.updateDate}
          status={item.status}
          forDetail={true}
        />
      </View>
      <View style={[styles.contentContainer]}>
        <Text style={[styles.content]}> {item.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  header: {
    backgroundColor: globalStyles.color.white,
    paddingBottom: 8,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  content: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
  },
});

export default BO_Detail;

// const onDetailModify = function () {
//   navigation.navigate('BO_Detail_Modify');
// };

// const onDetailImageViewer = function () {
//   navigation.navigate('BO_Detail_Image_Viewer');
// };

// const onDetailAddComment = function () {
//   navigation.navigate('BO_Detail_Add_Comment');
// };
// {
/* <Text>Branch Office Detail</Text>
<View>
  <Button title="첨부 이미지 보기" onPress={onDetailImageViewer} />
  <Button title="수정하기" onPress={onDetailModify} />
  <Button title="댓글달기" onPress={onDetailAddComment} />
</View> */
// }
