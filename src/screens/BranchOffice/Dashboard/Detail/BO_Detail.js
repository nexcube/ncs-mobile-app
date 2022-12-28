import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import InquiryCard from '../../../../components/Inquiry/InquiryCard';
import globalStyles from '../../../../styles/global';
import TopMenu from '../../../../components/Detail/TopMenu';
import Attachments from '../../../../components/Inquiry/Attachments';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import apiBranchList from '../../../../services/api/branchList';
import apiInquiryListItem from '../../../../services/api/inquiryListItem';

import CommentList from '../../../../components/Detail/CommentList';
import CustomInput from '../../../../components/common/CustomInput';

function BO_Detail({navigation, route}) {
  const index = route.params.index;

  // Status ////////////////////////////////////////////////////////////////////////////////////////\
  const [inquiryItem, setInquiryItem] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);
  // console.log(inquiryItem);

  // 마운트 될때
  // useEffect(() => {
  //   console.log('useEffect mounted');
  //   getInquiryListItem();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // 데이타가 바뀔때 마다.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TopMenu
          onModify={onModify}
          onDelete={onDelete}
          backgroundColor={globalStyles.color.purple}
          color={globalStyles.color.white}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiryItem]);

  //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInquiryListItem();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isRefresh) {
      console.log('useEffect isRefresh');
      getInquiryListItem();
    }
    return setIsRefresh(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh]);

  const getInquiryListItem = async () => {
    await apiInquiryListItem(index, onSuccessInquiryListItem);
  };

  const onSuccessInquiryListItem = data => {
    setInquiryItem(data[0]);
  };

  // Event Handler /////////////////////////////////////////////////////////////////////////////////
  const onModify = async () => {
    await apiBranchList(onSuccessBranchList);
  };

  const onSuccessBranchList = data => {
    const result = data.map(value => value);
    const params = {inquiryItem: inquiryItem, branchList: result};
    navigation.navigate('BO_Detail_Modify', params);
  };

  const onDelete = () => {
    console.log(inquiryItem);
  };

  const onPressAddComment = () => {
    const params = {index: index};
    navigation.navigate('BO_Detail_Add_Comment', params);
  };

  const [spinner, setSpinner] = useState(false);

  return (
    <SafeAreaView style={[styles.fullscreen]} edges={['bottom']}>
      <Spinner visible={spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
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
          <Attachments
            attachments={inquiryItem.attachments}
            setSpinner={setSpinner}
            isShowDelete={false}
          />
        </View>
        {/* <View style={[styles.commentLayout]}>
          <Text style={[styles.commentText]}>댓글수 {inquiryItem?.commentCount ?? 0}</Text>
        </View> */}
        <CommentList index={index} setSpinner={setSpinner} />
      </ScrollView>

      <View style={[styles.addComment]}>
        <CustomInput
          placeholder="댓글 입력..."
          editable={false}
          onPressIn={onPressAddComment}
          height={32}
        />
      </View>
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
    paddingVertical: 12,
  },
  content: {
    paddingHorizontal: 24,
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
  spinnerTextStyle: {
    color: '#FFF',
  },
  commentLayout: {
    alignItems: 'flex-end',
    marginHorizontal: 12,
    paddingVertical: 8,
    borderColor: globalStyles.color.gray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  commentText: {},
  commentButton: {
    marginHorizontal: 10,
  },
  addComment: {
    paddingHorizontal: 12,
  },
});

export default BO_Detail;
