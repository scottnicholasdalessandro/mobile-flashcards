import React from 'react';
import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Constants} from 'expo';
import NewDeck from './js/components/NewDeck';
import AddCard from './js/components/AddCard';
import DeckView from './js/components/DeckView';
import DeckListView from './js/components/DeckListView';
import Quiz from './js/components/Quiz';
import {setLocalNotification} from './js/utils/notifications';

const Tabs = createMaterialTopTabNavigator(
  {
    ShowDecks: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Decks'
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck'
      }
    }
  },
  {
    navigationOptions: {
      headerLeft: null
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: 'AddCard'
      }
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: {
        title: 'Deck'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationsOptions: {
        title: 'Quiz'
      }
    }
  },
  {
    navigationOptions: {
      headerLeft: null
    }
  }
);

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <MainNavigator />
      </View>
    );
  }
}
