import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';

function DebugView({right = 60, top = 60, text}) {
  return (
    <View style={[styles.container, {right: right, top: top}]}>
      <List.Accordion title="유저 정보" style={[styles.accordion]}>
        <View style={[styles.textContainer]}>
          <Text style={[styles.text]}>{JSON.stringify(text, null, '\t')}</Text>
        </View>
      </List.Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
  },
  accordion: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
  },
  textContainer: {
    backgroundColor: 'black',
  },
  text: {
    color: 'red',
    fontSize: 15,
  },
});

export default DebugView;
