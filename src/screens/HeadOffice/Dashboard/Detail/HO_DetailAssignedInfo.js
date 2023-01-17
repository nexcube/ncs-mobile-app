import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import InquiryCard from '../../../../components/BranchOffice/Dashboard/InquiryCard';
import AssignedStaffComp from '../../../../components/HeadOffice/Detail/AssignedStaffComp';
import globalStyles from '../../../../styles/globalStyles';
import CategoryAssignedComp from '../../../../components/HeadOffice/Detail/CategoryAssignedComp';
import AssignedWatchComp from '../../../../components/HeadOffice/Detail/AssignedWatchComp';

function HO_DetailAssignedInfo({navigation, route}) {
  const inquiryItem = route.params;
  const [refresh, setRefresh] = useState(false);

  const onChange = () => {
    setRefresh(false);
    navigation.navigate('HO_Detail_Assigned_Search', {
      inquiryItem: inquiryItem,
    });
    navigation;
  };

  return (
    <View style={[styles.fullscreen]}>
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
          isHO={false}
          forDetail={true}
        />
      </View>

      <ScrollView style={[styles.assignedStaff]} alwaysBounceVertical={false}>
        <AssignedStaffComp
          staffId={inquiryItem.assignedStaffId}
          title="지정 담당자"
          isChange={true}
          onChange={onChange}
        />

        <View style={[styles.separator]} />
        <CategoryAssignedComp catIdx={inquiryItem.catIdx} title="분류 담당자" isChange={false} />
        <View style={[styles.watchList]}>
          <AssignedWatchComp catIdx={inquiryItem.catIdx} refresh={refresh} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    // flex: 1,
  },
  header: {
    backgroundColor: globalStyles.color.white,
    paddingBottom: 8,
  },
  assignedStaff: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  separator: {
    marginVertical: 24,
    height: 1,
    backgroundColor: globalStyles.color.grayLight,
    marginHorizontal: 12,
  },
  watchList: {
    paddingVertical: 24,
  },
});

export default HO_DetailAssignedInfo;
