import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import InquiryCard from '../../../../components/BranchOffice/Dashboard/InquiryCard';
import globalStyles from '../../../../styles/globalStyles';
import TopMenu from '../../../../components/BranchOffice/Detail/TopMenu';
import Attachments from '../../../../components/BranchOffice/Dashboard/Attachments';
import {SafeAreaView} from 'react-native-safe-area-context';
import apiInquiryBranch from '../../../../services/api/inquiry/branch';
import apiInquiryListItem from '../../../../services/api/inquiry/listItem';

import CommentList from '../../../../components/BranchOffice/Detail/CommentList';
import CustomInput from '../../../../components/common/CustomInput';
import {useFocusEffect} from '@react-navigation/native';
import apiInquiryDeleteItem from '../../../../services/api/inquiry/deleteItem';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import TopMenuFromHO from '../../../../components/BranchOffice/Detail/TopMenuFromHO';
import apiInquiryUpdateShare from '../../../../services/api/inquiry/updateShare';
import CustomToast, {Toast} from '../../../../components/common/CustomToast';
import {QnaStatus} from '../../../../services/config';

function BO_Detail({navigation, route}) {
  const qnaIndex = route.params.index;
  const isFromHO = route.params.fromHO ?? false;

  // Status ////////////////////////////////////////////////////////////////////////////////////////\
  const [inquiryItem, setInquiryItem] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isFromHO ? (
          <TopMenuFromHO
            sharedInfo={inquiryItem.share}
            onChangeAssigned={onChangeAssigned}
            onSharedInfo={onSharedInfo}
            backgroundColor={globalStyles.color.purple}
            color={globalStyles.color.white}
          />
        ) : (
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
      getInquiryListItem();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    if (isRefresh) {
      // console.log('useEffect isRefresh');
      getInquiryListItem();
    }
    return setIsRefresh(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh]);

  const getInquiryListItem = async () => {
    await apiInquiryListItem(qnaIndex, onSuccessInquiryListItem);
  };

  const onSuccessInquiryListItem = data => {
    setInquiryItem(data);
    // console.log(JSON.stringify(data, null, '\t'));
  };

  // Event Handler /////////////////////////////////////////////////////////////////////////////////
  const onModify = async () => {
    await apiInquiryBranch().then(data => {
      const result = data.map(value => value);
      const params = {inquiryItem: inquiryItem, branchList: result};
      navigation.navigate('BO_Detail_Modify', params);
    });
  };

  const onDelete = async () => {
    Alert.alert('??????', '????????? ?????????????????????????', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => apiInquiryDeleteItem(qnaIndex, onSuccessInquiryDelete)},
    ]);
  };

  const onChangeAssigned = async share => {
    navigation.navigate('HO_Detail_Assigned_Info', inquiryItem);
  };

  const onSharedInfo = async share => {
    apiInquiryUpdateShare(qnaIndex, share, onSuccessShareInfo);
  };

  const onSuccessShareInfo = (data, share) => {
    // console.log('onSuccessShareInfo');
    setIsRefresh(true);
    const message = '????????????' + (share === 0 ? '?????? ?????????????????????.' : '??? ?????????????????????.');

    Toast.show({
      type: 'infoMsg',
      visibilityTime: 3000,
      props: {
        message: message,
      },
      position: 'bottom',
    });
  };

  const onSuccessInquiryDelete = () => {
    navigation.goBack();
  };

  const onPressAddComment = () => {
    // console.log('onPressAddComment');

    const params = {index: qnaIndex, status: QnaStatus[inquiryItem.status]};
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
          isHO={isFromHO}
          forDetail={true}
          assignedStaffId={inquiryItem.assignedStaffId}
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
          <Text style={[styles.commentText]}>????????? {inquiryItem?.commentCount ?? 0}</Text>
        </View> */}
        <CommentList index={qnaIndex} qnaStatus={inquiryItem.status} qnaIndex={inquiryItem.idx} />
      </ScrollView>

      <View style={[styles.addComment]}>
        <Pressable onPress={onPressAddComment}>
          <CustomInput
            placeholder="?????? ??????..."
            editable={false}
            onPressIn={onPressAddComment}
            height={38}
          />
        </Pressable>
      </View>
      <CustomToast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  header: {
    backgroundColor: globalStyles.color.white,
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
    paddingVertical: 3,
  },
});

export default BO_Detail;
