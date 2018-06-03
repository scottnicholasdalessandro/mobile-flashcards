import {AsyncStorage} from 'react-native';
import {setDummyData, DECKS_KEY} from './dummyData';
import uuid from 'uuid/v4';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_KEY).then(decks => (decks === null ? setDummyData() : JSON.parse(decks)));
}


export function addDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({[deck.title]: deck}));
}

export function updateDeck(deck) {
  debugger;
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({[deck.title]: {...deck, questions: [...deck.questions]}}));
}

export function removeDecks(id = DECKS_KEY) {
  return AsyncStorage.removeItem(id);
}




