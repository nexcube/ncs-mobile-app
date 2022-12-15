import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import InquiryCard from '../../../../components/Inquiry/InquiryCard';
import globalStyles from '../../../../styles/global';
import TopMenu from '../../../../components/Detail/TopMenu';

function BO_Detail({navigation, route}) {
  const inquiryItem = route.params;
  console.log(JSON.stringify(inquiryItem, null, '\t'));

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <TopMenu inquiryItem={inquiryItem} />,
    });
  });
  return (
    <View style={[styles.fullscreen]}>
      <View style={[styles.header]}>
        <InquiryCard
          mode="contained"
          key={inquiryItem.idx}
          title={inquiryItem.title}
          content={inquiryItem.content}
          mainCatName={inquiryItem.mainCatName}
          subCatName={inquiryItem.subCatName}
          branchOfficeName={inquiryItem.branchOfficeName}
          inquirer={inquiryItem.inquirer}
          levelName={inquiryItem.levelName}
          updateDate={inquiryItem.updateDate}
          status={inquiryItem.status}
          commentCount={inquiryItem.commentCount}
          forDetail={true}
        />
      </View>
      <View style={[styles.separator]} />
      <View style={[styles.contentContainer]}>
        <Text style={[styles.content]}> {inquiryItem.content}</Text>
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
  separator: {
    backgroundColor: globalStyles.color.grayLight,

    height: 1,
    width: '100%',
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
