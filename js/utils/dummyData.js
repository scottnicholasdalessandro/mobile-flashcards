import {AsyncStorage} from 'react-native';
export const DECKS_KEY = 'DecksKey';


export function setDummyData() {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  };

  return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(dummyData))
    .then(() => {
      return dummyData;
    })
    .catch(err => console.log(err));    
  
}

// export function decksAndDummyData(results) {  
//   return results === undefined ? setDummyData() : JSON.stringify(results);
// }