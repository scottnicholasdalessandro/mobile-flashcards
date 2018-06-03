import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {addDeck, getKeys, fetchDecks, initializeDecksKey, createDeck, updateDeck} from '../utils/api';

class DeckView extends Component {
  // state = {};

  render() {
    // const stateKeys = Object.keys(this.state).length > 0;
    const deck = this.props.navigation.getParam('deck');
    return (
      <View style={styles.deck}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.questions}>{deck.questions.length} Count</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('AddCard', {
                deck,
                title: deck.title
              })
            }
          >
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                deck
              })
            }
          >
            <Text>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ShowDecks')}>
            <Text>Back To Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DeckView;

const styles = StyleSheet.create({
  deck: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20
  },
  questions: {
    fontSize: 12,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'gray',
    margin: 20,
    padding: 10,
    width: 100
  }
});
