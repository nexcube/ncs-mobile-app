import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

function InquiryList({todos}) {
  return (
    <FlatList
      contentContainerStyle={[styles.scrollContainer]}
      data={todos}
      renderItem={({item}) => (
        <View style={[styles.listItem]}>
          <Text style={[styles.title]}>This is Title</Text>
          <Text>{item.text}</Text>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
});
export default InquiryList;
