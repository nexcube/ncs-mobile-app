import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import InquiryCard from '../../../../components/Inquiry/InquiryCard';
import globalStyles from '../../../../styles/global';
import TopMenu from '../../../../components/Detail/TopMenu';
import Attachments from '../../../../components/Inquiry/Attachments';
import {SafeAreaView} from 'react-native-safe-area-context';
import apiInquiryBranch from '../../../../services/api/inquiry/branch';
import apiInquiryListItem from '../../../../services/api/inquiry/listItem';

import CommentList from '../../../../components/Detail/CommentList';
import CustomInput from '../../../../components/common/CustomInput';
import {useFocusEffect} from '@react-navigation/native';
import apiInquiryDeleteItem from '../../../../services/api/inquiry/deleteItem';

function BO_Detail({navigation, route}) {
  const index = route.params.index;

  // Status ////////////////////////////////////////////////////////////////////////////////////////\
  const [inquiryItem, setInquiryItem] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      console.log('BO_Detail: focus...');
      getInquiryListItem();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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
    await apiInquiryBranch(onSuccessBranch);
  };

  const onSuccessBranch = data => {
    const result = data.map(value => value);
    const params = {inquiryItem: inquiryItem, branchList: result};
    navigation.navigate('BO_Detail_Modify', params);
  };

  const onDelete = async () => {
    Alert.alert('주의', '정말로 삭제하시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => apiInquiryDeleteItem(index, onSuccessInquiryDelete)},
    ]);
  };

  const onSuccessInquiryDelete = () => {
    navigation.goBack();
  };

  const onPressAddComment = () => {
    const params = {index: index};
    navigation.navigate('BO_Detail_Add_Comment', params);
  };

  return (
    <SafeAreaView style={[styles.fullscreen]} edges={['bottom']}>
      <View style={[styles.header, globalStyles.elevated]}>
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

      <ScrollView>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.content]}> {inquiryItem.content}</Text>
        </View>

        <View style={[styles.attachmentsContainer]}>
          <Attachments attachments={inquiryItem.attachments} isShowDelete={false} />
        </View>
        {/* <View style={[styles.commentLayout]}>
          <Text style={[styles.commentText]}>댓글수 {inquiryItem?.commentCount ?? 0}</Text>
        </View> */}
        <CommentList index={index} />
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
