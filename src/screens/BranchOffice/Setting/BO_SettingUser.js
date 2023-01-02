import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import SettingBOList from '../../../components/setting/SettingBOList';
import apiInquiryBranch from '../../../services/api/inquiry/branch';
import apiBranchStaffList from '../../../services/api/setting/branchStaffList';
import apiSettingQnaAccessUserList from '../../../services/api/setting/qnaAccessUser/list';

import globalStyles from '../../../styles/global';

function BO_SettingUser({navigation, route}) {
  const [branchList, setBranchList] = useState([]);
  const [branchStaffs, setBranchStaffs] = useState([[]]);
  const [branchStaffsRefined, setBranchStaffsRefined] = useState([[]]);
  const [qnaAccessUser, setQnaAccessUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useFocusEffect(
    useCallback(() => {
      apiInquiryBranch(onSuccessBranch);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onSuccessBranch = async data => {
    setBranchList(data);
  };

  useEffect(() => {
    if (branchList.length > 0) {
      apiBranchStaffList(
        branchList.map(branch => branch.facilityCode),
        onSuccessBranchStaffList,
      );
      apiSettingQnaAccessUserList(
        branchList.map(branch => branch.facilityCode),
        onSuccessList,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchList]);

  const onSuccessBranchStaffList = data => {
    const result = branchList.map(branch =>
      data.filter(staff => staff.facilityCode === branch.facilityCode),
    );
    setBranchStaffs(result);
  };

  const onSuccessList = async data => {
    setQnaAccessUser(data);
  };

  useEffect(() => {
    if ((branchStaffs.length > 0, qnaAccessUser.length > 0)) {
      const staffIds = branchList
        .map(branch => qnaAccessUser.filter(val => val.facilityCode === branch.facilityCode))
        .flat(1);

      const final = branchStaffs.map(branch =>
        branch.filter(staff =>
          staffIds.some(s => s.staffId === staff.staffId || staff.rankCode === 'L10'),
        ),
      );
      console.log(JSON.stringify(final, null, '\t'));

      setBranchStaffsRefined(
        final.map(f =>
          f.sort((a, b) => {
            if (a.rankCode === 'L10') {
              return -1;
            }
          }),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchStaffs, qnaAccessUser]);

  useEffect(() => {
    apiInquiryBranch(onSuccessBranch);
  }, [refresh]);

  return (
    <View style={[styles.fullscreen]}>
      <View style={[styles.info]}>
        <Text style={[styles.infoText]}>
          에듀플렉스 소통앱은 기본적으로 지점 원장님 권한만 로그인 및 사용이 가능합니다. 그러나,
          특별한 이유로 다른 구성원이 소통앱 사용을 해야 할 필요가 있을 경우, 이곳에서 해당 구성원을
          추가하여 앱 사용권한을 부여할 수 있습니다.
        </Text>
      </View>
      <ScrollView>
        <SettingBOList
          key={branchList.facilityCode}
          branchList={branchList.map(branch => branch.name)}
          branchStaffs={branchStaffs}
          branchStaffsRefined={branchStaffsRefined}
          setRefresh={setRefresh}

          // branchStaffs={[
          //   ['홍길동 원장', '홍길동 부원장'],
          //   ['홍길동 원장', '홍길동 부원장'],
          // ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    paddingHorizontal: 18,
  },
  info: {
    paddingVertical: 24,
  },
  infoText: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    color: globalStyles.color.grayDark,
  },
});

export default BO_SettingUser;
