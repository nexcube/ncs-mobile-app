import React from 'react';
import {FlatList, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';

const ClassifyList = ({list, onPress}) => {
  return (
    <FlatList
      data={list}
      renderItem={({item, index}) => (
        <ClassifyItem
          key={index}
          index={item.it_QnaCatIdx}
          title={item.st_QnaCatName}
          onPress={onPress}
        />
      )}
      keyExtractor={(item, index) => index}
      ItemSeparatorComponent={() => <View style={[styles.separator]} />}
    />
  );
};

const ClassifyItem = ({index, title, onPress}) => (
  <View>
    <Pressable
      onPress={() => onPress(index, title)}
      style={({pressed}) => [styles.button, Platform.OS === 'ios' && pressed && {opacity: 0.5}]}
      android_ripple={{
        color: globalStyles.color.white,
      }}>
      <Text style={[styles.item]}>{title}</Text>
    </Pressable>
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
export default ClassifyList;
