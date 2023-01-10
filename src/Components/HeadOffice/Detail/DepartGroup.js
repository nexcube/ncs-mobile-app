import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, List} from 'react-native-paper';
import {useEffect} from 'react/cjs/react.development';

import apiAssignedDepartStaffs from '../../../services/api/assigned/departStaffs';
import apiAssignedInfo from '../../../services/api/assigned/info';
import globalStyles from '../../../styles/globalStyles';
import AssignedStaffComp from './AssignedStaffComp';
import Icon from 'react-native-vector-icons/Feather';

function DepartGroup({idx, name, isIncludeRetire, setStaffCount, searchString}) {
  // const [staffs, setStaffs] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [expanded, setExpanded] = React.useState(true);

  useEffect(() => {
    setStaffs([]);
    apiAssignedDepartStaffs(idx, isIncludeRetire).then(async data => {
      const result = data.map(item => item.staffId);
      console.log(JSON.stringify(result, null, '\t'));
      // setStaffs(result);
      setStaffCount(prev => prev + result.length);

      for (const staffId of result) {
        const info = await apiAssignedInfo(staffId);
        setStaffs(prev => [...prev, info]);
        console.log(staffId, '---------------------------------------------------------');
        console.log(JSON.stringify(info, null, '\t'));
        setExpanded(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIncludeRetire]);

  // return (
  //   <List.Accordion
  //     expanded={expanded}
  //     left={props => (
  //       <Text style={[styles.titleStyle]} {...props} icon="folder">
  //         {name}
  //       </Text>
  //     )}
  //     title={staffs.length}
  //     id={idx}
  //     style={[styles.container]}
  //     titleStyle={[styles.count]}>
  //     {staffs?.length > 0 &&
  //       staffs.map((staff, idx) => (
  //         // <Card style={[styles.cardContainer]}>

  //         <Card.Title
  //           style={[styles.card]}
  //           title={'  ' + staff?.staffName + ' ' + staff?.dutyName}
  //           titleStyle={styles.title}
  //           titleVariant="labelLarge"
  //           subtitle={'  ' + staff?.departName + '∙' + staff?.positionName}
  //           subtitleStyle={styles.subTitle}
  //           left={props => (
  //             <View style={[styles.iconContainer]}>
  //               <Icon name="user" size={30} color={globalStyles.color.white} />
  //             </View>
  //           )}
  //         />

  //         // </Card>
  //       ))}
  //   </List.Accordion>
  // );

  return (
    <List.Accordion
      id={idx}
      title="Controlled Accordion"
      left={props => <List.Icon {...props} icon="folder" />}
      expanded={expanded}>
      <List.Item title="First item" />
      <List.Item title="Second item" />
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.background,
  },
  titleStyle: {
    paddingLeft: 12,
    color: globalStyles.color.text,
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    fontWeight: '500',
  },
  count: {
    color: globalStyles.color.gray,
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    fontWeight: '500',
  },

  card: {
    backgroundColor: globalStyles.color.white,
  },

  title: {
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    fontWeight: '700',
    color: globalStyles.color.text,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: globalStyles.color.purple,
    alignItems: 'center',
  },
  subTitle: {
    fontFamily: globalStyles.font.bold,
    fontSize: 13,
    fontWeight: '600',
    color: globalStyles.color.gray,
  },
  separator: {
    height: 10,
    backgroundColor: globalStyles.color.red,
    marginHorizontal: 15,
    marginVertical: 8,
  },
});

export default DepartGroup;
