import React from 'react';
import {FlatList, Text, View} from 'react-native';

// {staffId, content, updateDate}
const CommentItem = ({data}) => {
  return (
    <View style={[{borderWidth: 1, borderColor: 'red', margin: 10}]}>
      <View>
        <Text>
          {data.staffId} {data.updateDate}
        </Text>
      </View>
      <View>
        <Text>{data.content}</Text>
      </View>
    </View>
  );
};

export default CommentItem;
