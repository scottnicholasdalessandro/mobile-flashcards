import React, {Component} from 'react';
import {View, FlatList, Text, TextInput, Button, TouchableOpacity, Platform, Picker, StyleSheet} from 'react-native';
import {addDeck, removeDecks, fetchDecks, initializeDecksKey, createDeck, updateDeck} from '../utils/api';
import DeckItem from './DeckItem';

export default class DeckListView extends Component {
  state = {
    decks: [],
    mounted: false
  };

  componentDidMount() {    
    fetchDecks().then(decks => {
      decks = Object.keys(decks).map(key => {
        return decks[key];
      });

      this.setState({
        decks: decks,
        mounted: true
      });
      console.log(Array.isArray(this.state.decks), this.state.decks, 'DECKS');
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      fetchDecks().then(decks => {
        decks = Object.keys(decks).map(key => {
          return decks[key];
        });
        this.setState({
          decks: decks
        });
      });
    }
  }

  render() {
    const mounted = this.state.mounted;
    return mounted ? (
      <View style={styles.container}>
        <FlatList
          data={this.state.decks}
          keyExtractor={deck => deck.title}
          renderItem={({item, index}) => {
            return (
              <View style={styles.deck}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('DeckView', {
                      deck: item
                    })
                  }
                >
                  <DeckItem title={item.title} questions={item.questions} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    ) : (
      <View>
        <Text>Loading</Text>
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
  deck: {
    margin: 0,
    padding: 0
  }
});
