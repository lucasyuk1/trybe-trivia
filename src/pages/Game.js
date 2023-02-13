import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';
import Questions from '../components/Questions';
import { fetchQuestions } from '../services/apiTrivia';

class Game extends Component {
  state = {
    questions: [],
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
    const { questions } = this.state;
    const { currentQuest } = this.props;
    console.log(currentQuest);
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
  currentQuest: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({ ...globalState.player });

export default connect(mapStateToProps)(Game);
