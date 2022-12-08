import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../../styles/global';

const ClassList = ({list}) => {
  console.log(list);
  return (
    <FlatList
      data={list}
      renderItem={({item}) => <ClassItem title={item} />}
      keyExtractor={(item, index) => index}
      ItemSeparatorComponent={() => <View style={[styles.separator]} />}
    />
  );
};

const ClassItem = ({title}) => (
  <View>
    <Text style={[styles.item]}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    color: globalStyles.color.text,
    backgroundColor: globalStyles.color.white,
  },
  separator: {
    width: '100%',
    height: 1,
    paddingLeft: 20,
    backgroundColor: globalStyles.color.separator,
  },
});
export default ClassList;
