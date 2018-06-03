import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function DeckItem(props) {
  return (
    <View style={styles.deck}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.questions}>{props.questions && props.questions.length} Cards</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deck: {
    alignItems: 'center',
    height: 60,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue'
  },
  questions: {
    fontSize: 12,
    textAlign: 'center',
    color: 'blue'
  }
});

export default DeckItem;
