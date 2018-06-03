import React, {Component} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Picker, Alert} from 'react-native';
import {addDeck, getKeys, fetchDecks, initializeDecksKey, createDeck, updateDeck} from '../utils/api';
import SubmitBtn from './SubmitBtn';

class AddCard extends Component {
  state = {
    question: null,
    answer: null,
    deck: {...this.props.navigation.getParam('deck')}
  };
  componentDidMount() {
    const title = this.props.navigation.getParam('title');
    fetchDecks()
      .then(decks => {
        const deck = decks[title];
        console.log(deck, 'DECK');
        this.setState(() => ({
          deck: deck
        }));
      })
      .catch(err => console.log(err));
  }

  submit = e => {
    e.preventDefault();
    const question = this.state.question;
    const answer = this.state.answer;

    if (question === null) {
      Alert.alert('Please add a question');
    } else if (answer === null) {
      Alert.alert('Please add an answer');
    } else {
      this.setState(prevState => {
        return {deck: {...prevState.deck, questions: [...prevState.deck.questions, {question, answer}]}};
      });
      const deck = {...this.state.deck, questions: [...this.state.deck.questions, {question, answer}]};
      updateDeck(deck).then(() => {
        this.setState(() => ({
          question: null,
          answer: null,
          deck: {...this.props.navigation.getParam('deck')}
        }));
        this.props.navigation.navigate('DeckView', {
          deck
        });
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add Question</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={question => this.setState({question})}
          value={this.state.question}
        />
        <Text style={styles.title}>Add Answer</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={answer => this.setState({answer})}
          value={this.state.answer}
        />
        {/*
        <Picker selectedValue={this.state.answer} style={styles.picker} onValueChange={this.pickerChange}>
          <Picker.Item label="Correct" value="correct" />
          <Picker.Item label="Incorrect" value="incorrect" />
        </Picker>
        */}
        <SubmitBtn onPress={this.submit} text={'SUBMIT'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  picker: {
    height: 75,
    width: 200,
    borderColor: 'gray',
    borderWidth: 2,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default AddCard;
