import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import SettingBOList from '../../../components/BranchOffice/Setting/SettingBOList';

import apiInquiryBranch from '../../../services/api/inquiry/branch';
import apiBranchStaffList from '../../../services/api/setting/branchStaffList';
import apiSettingQnaAccessUserList from '../../../services/api/setting/qnaAccessUser/list';

import globalStyles from '../../../styles/globalStyles';

function BO_SettingUser({navigation, route}) {
  const [branchList, setBranchList] = useState([]);
  const [branchStaffs, setBranchStaffs] = useState([[]]);
  const [branchStaffsRefined, setBranchStaffsRefined] = useState([[]]);
  const [refresh, setRefresh] = useState(false);

  const apiCall = useCallback(() => {
    setRefresh(false);
    apiInquiryBranch()
      .then(response => {
        setBranchList(response);
        return response;
      })
      .then(_branchList => {
        apiBranchStaffList(_branchList.map(branch => branch.facilityCode)).then(response => {
          const _branchStaffs = _branchList.map(branch =>
            response.filter(staff => staff.facilityCode === branch.facilityCode),
          );
          setBranchStaffs(_branchStaffs);
          const _branchStaffsRefined = _branchStaffs.map(staffs =>
            staffs.filter(staff => staff.rankCode === 'L10'),
          );
          setBranchStaffsRefined(
            _branchStaffsRefined.map(f =>
              f.sort((a, b) => {
                if (a.profile_idx > b.profile_idx) {
                  return 1;
                } else {
                  return -1;
                }
              }),
            ),
          );
          // console.log(JSON.stringify(_branchStaffsRefined, null, '\t'));

          apiSettingQnaAccessUserList(_branchList.map(branch => branch.facilityCode)).then(
            _qnaAccessUser => {
              if (_qnaAccessUser.length > 0) {
                const staffIds = _branchList
                  .map(branch =>
                    _qnaAccessUser.filter(val => val.facilityCode === branch.facilityCode),
                  )
                  .flat(1);
                const final = _branchStaffs.map(branch =>
                  branch.filter(staff =>
                    staffIds.some(s => s.staffId === staff.staffId || staff.rankCode === 'L10'),
                  ),
                );
                // console.log(JSON.stringify(final, null, '\t'));
                setBranchStaffsRefined(
                  final.map(f =>
                    f.sort((a, b) => {
                      if (a.rankCode === 'L10' && a.rankCode === b.rankCode) {
                        if (a.profile_idx > b.profile_idx) {
                          return 1;
                        } else {
                          return -1;
                        }
                      }
                      if (a.rankCode === 'L10') {
                        return -1;
                      }
                    }),
                  ),
                );
              }
            },
          );
        });
      });
  }, []);

  useFocusEffect(apiCall);

  useEffect(() => {
    if (refresh) {
      apiCall();
    }
  }, [apiCall, refresh]);

  return (
    <View style={[styles.fullscreen]}>
      <View style={[styles.info]}>
        <Text style={[styles.infoText]}>
          ??????????????? ???????????? ??????????????? ?????? ????????? ????????? ????????? ??? ????????? ???????????????. ?????????,
          ????????? ????????? ?????? ???????????? ????????? ????????? ?????? ??? ????????? ?????? ??????, ???????????? ?????? ????????????
          ???????????? ??? ??????????????? ????????? ??? ????????????.
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
          //   ['????????? ??????', '????????? ?????????'],
          //   ['????????? ??????', '????????? ?????????'],
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
