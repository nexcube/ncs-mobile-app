import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

import InquiryCard from '../../../../components/Inquiry/InquiryCard';
import globalStyles from '../../../../styles/global';
import TopMenu from '../../../../components/Detail/TopMenu';
import userData from '../../../../services/DeviceStorage';
import Attachments from '../../../../components/Inquiry/Attachments';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

function BO_Detail({navigation, route}) {
  const index = route.params.index;

  // Status ////////////////////////////////////////////////////////////////////////////////////////\
  const [inquiryItem, setInquiryItem] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);

  // 마운트 될때
  // useEffect(() => {
  //   console.log('useEffect mounted');
  //   getInquiryListItem();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // 데이타가 바뀔때 마다.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <TopMenu onModify={onModify} onDelete={onDelete} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiryItem]);

  //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('useEffect focus');
      getInquiryListItem();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    if (isRefresh) {
      console.log('useEffect isRefresh');
      getInquiryListItem();
    }
    return setIsRefresh(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh]);

  const getInquiryListItem = async () => {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;
    let url = `/inquiry/list/${index}`;

    axios
      .get(url, {
        headers: {authorization: token},
      })
      // 성공
      .then(res => {
        console.log(`/inquiry/list/${index}`);
        console.log(JSON.stringify(res.data[0], null, '\t'));
        setInquiryItem(res.data[0]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Event Handler /////////////////////////////////////////////////////////////////////////////////
  const onModify = async () => {
    const staffId = await userData.getStaffId();
    const jwt = await userData.getJWT();
    const token = `${jwt}`;
    axios
      .get('/inquiry/branchOfficeList', {
        headers: {authorization: token},
        params: {id: staffId},
      })
      .then(res => {
        const result = res.data.map(value => value);
        // console.log(inquiryItem);
        const params = {inquiryItem: inquiryItem, branchOfficeList: result};

        navigation.navigate('BO_Detail_Modify', params);
      })
      .catch(error => console.error(error));
  };

  const onDelete = () => {
    console.log(inquiryItem);
  };

  return (
    <SafeAreaView style={[styles.fullscreen]}>
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
      <ScrollView>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.content]}> {inquiryItem.content}</Text>
        </View>

        <View style={[styles.attachmentsContainer]}>
          <Attachments attachments={inquiryItem.attachments} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  attachmentsContainer: {
    padding: 20,
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
