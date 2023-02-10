import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';
import Questions from '../components/Questions';
import { fetchQuestions } from '../services/apiTrivia';

class Game extends Component {
  state = {
    questions: [],
    currentQuest: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }
    const data = await fetchQuestions(token);
    const questions = data.results;
    if (questions.length < 1) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ questions });
  }

  render() {
    const { questions, currentQuest } = this.state;
    return (
      <div>
        <GameHeader />
        { questions.map((quest, index) => (
          index === currentQuest
            && <Questions
              { ...quest }
              key={ quest.question }
              question={ quest.question }
              correctAnswer={ quest.correct_answer }
              incorrectAnswers={ quest.incorrect_answers }
            />
        ))}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
