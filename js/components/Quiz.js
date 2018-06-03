import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SubmitBtn from './SubmitBtn';
import {clearLocalNotification, setLocalNotification} from '../utils/notifications';

export default class Quiz extends Component {
  state = {
    questionIndex: 0,
    cardFlipped: false,
    score: 0
  };

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  cardFlipper = () => {
    this.setState(prevState => ({
      cardFlipped: !prevState.cardFlipped
    }));
  };

  correctAndIncorrect = () => {
    return (
      <View>
        <SubmitBtn
          style={styles.correctBtn}
          onPress={() => {
            this.setState(prevState => {
              return {
                questionIndex: ++prevState.questionIndex,
                cardFlipped: false,
                score: ++prevState.score
              };
            });
          }}
          text={'Correct'}
        />
        <SubmitBtn
          style={styles.incorrectBtn}
          onPress={() => {
            this.setState(prevState => ({
              cardFlipped: false,
              questionIndex: ++prevState.questionIndex
            }));
          }}
          text={'Incorrect'}
        />
      </View>
    );
  };

  renderFlippedCard = (questionIndex, questions) => {
    return (
      <View>
        <Text>{questions[questionIndex].answer}</Text>
        <TouchableOpacity onPress={this.cardFlipper}>
          <Text style={{color: 'blue'}}>Back to Question</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderIndividualQuestion = (questionIndex, questions) => {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>{questions[questionIndex].question}</Text>
        <TouchableOpacity onPress={this.cardFlipper}>
          <Text style={{color: 'red'}}>Reveal Answer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  questionCountTally = (totalQuestions, indexQuestion) => {
    return (
      <View>
        <Text>{this.calculateRemainingQuestions(totalQuestions, indexQuestion)}</Text>
      </View>
    );
  };

  calculateRemainingQuestions = (totalQuestions, indexQuestion) => {
    const remaining = totalQuestions - indexQuestion;
    return remaining > 1 ? `${remaining} Questions Remaining` : `Last Question`;
  };

  calculateScore = (totalQuestions, score) => {
    return (score / totalQuestions * 100).toFixed();
  };

  quizStatus = (totalQuestions, score, deck) => {
    return (
      <View>
        <Text>Score: {this.calculateScore(totalQuestions, score)}</Text>
        <View>
          <SubmitBtn onPress={() => this.props.navigation.navigate('ShowDecks')} text={'Back To Home'} />
        </View>
        <View>
          <SubmitBtn
            onPress={() => {
              this.setState(() => ({
                questionIndex: 0,
                cardFlipped: false,
                score: 0
              }));
              // this.props.navigation.navigate('Quiz', {deck});
            }}
            text={'Retake Quiz'}
          />
        </View>
      </View>
    );
  };

  render() {
    const {questionIndex, score, cardFlipped} = this.state;
    const {questions, title} = this.props.navigation.getParam('deck');
    const totalQuestions = questions.length;
    const continueQuestionProgression = questionIndex < totalQuestions;
    return (
      <View style={styles.container}>
        {continueQuestionProgression ? (
          <View>
            <View style={styles.tally}>{this.questionCountTally(totalQuestions, questionIndex)}</View>
            <View>
              <View>
                {cardFlipped ? (
                  <View>{this.renderFlippedCard(questionIndex, questions)}</View>
                ) : (
                  <View>{this.renderIndividualQuestion(questionIndex, questions)}</View>
                )}
              </View>
            </View>

            <View>{this.correctAndIncorrect()}</View>
          </View>
        ) : (
          <View>{this.quizStatus(totalQuestions, score, this.props.navigation.getParam('deck'))}</View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tally: {
    padding: 20,
    margin: 5
  },
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  correctBtn: {
    backgroundColor: 'limegreen',
    padding: 10,
    margin: 5,
    justifyContent: 'center'
  },
  incorrectBtn: {
    backgroundColor: 'orangered',
    padding: 10,
    margin: 5,
    justifyContent: 'center'
  }
});
