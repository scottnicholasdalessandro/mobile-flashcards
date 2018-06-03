import React, {Component} from 'react';
import {View, Button, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {addDeck, getKeys, fetchDecks, initializeDecksKey, createDeck, removeDecks} from '../utils/api';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';
import {setDummyData, decksAndDummyData} from '../utils/dummyData';
import NavigationActions from 'react-navigation';
import SubmitBtn from './SubmitBtn';

class NewDeck extends Component {
  state = {
    text: ''
  };

  DeckCreator = function(title) {
    this.title = title;
    this.questions = [];
  };
  // revise submit button
  submit = e => {
    e.preventDefault();
    const title = this.state.text;
    const deck = new this.DeckCreator(title);
    this.setState(() => ({
      text: ''
    }));
    addDeck(deck)
      .then(() => {
        return this.addCard(deck);
      })
      .catch(err => {
        console.log(err);
      });
  };

  addCard = deck => {
    this.props.navigation.navigate('DeckView', {
      deck
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
          <SubmitBtn onPress={this.submit} text={'SUBMIT'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    textAlign: 'center'
  }
});

export default NewDeck;
