import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { incrementQuest, incrementScore, incrementAssertions } from '../redux/actions';

class Questions extends Component {
  state = {
    showColors: false,
    answersOrder: [],
    timer: 30,
    disabled: false,
    showNextButton: false,
    magicNumber: 5,
  };

  // comentário teste

  componentDidMount() {
    // const { answersOrder } = this.state;
    this.defineOrder();
    // console.log('ordem :', answersOrder);
    const secondsInterval = 1000;
    setTimeout(() => this.funcTimer(), secondsInterval);
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  isCorrect = (choice) => {
    const { correctAnswer, incorrectAnswers } = this.props;

    let result = `wrong-answer-${incorrectAnswers.indexOf(choice)}`;

    if (correctAnswer === choice) {
      result = 'correct-answer';
    }
    return result;
  };

  colorSwitch = (choice) => {
    const { correctAnswer } = this.props;

    let result = 'wrong-answer';

    if (correctAnswer === choice) {
      result = 'correct-answer';
    }
    return result;
  };

  handleClick = (answer) => {
    const { timer } = this.state;
    const { correctAnswer, difficulty, dispatch } = this.props;
    let { score } = this.props;

    const difficultyEasy = 1;
    const difficultyMedium = 2;
    const difficultyHard = 3;
    let difficultyMeter = 1;

    if (difficulty === 'easy') {
      difficultyMeter = difficultyEasy;
    } else if (difficulty === 'medium') {
      difficultyMeter = difficultyMedium;
    } else if (difficulty === 'hard') {
      difficultyMeter = difficultyHard;
    }

    if (answer === correctAnswer) {
      // console.log('certa resposta!');
      // console.log('Score: ', score);
      let { assertions } = this.props;

      const ten = 10;
      const points = score + ten + (timer * difficultyMeter);
      score = points;
      // console.log('Score after: ', score);
      this.setState({ showNextButton: true });
      dispatch(incrementScore({ score }));
      assertions += 1;
      dispatch(incrementAssertions(assertions));
    } else {
      this.setState({ showNextButton: true });
      // console.log('resposta incorreta');
    }
    this.setState({ showColors: true });
  };

  defineOrder = () => {
    const { correctAnswer, incorrectAnswers } = this.props;

    const answers = this.shuffleArray([correctAnswer, ...incorrectAnswers]);

    this.setState({ answersOrder: answers });
  };

  funcTimer = () => {
    let { timer } = this.state;
    const secondsInterval = 1000;
    // console.log('props:', this.props);

    setInterval(() => {
      if (timer > 0) {
        timer -= 1;
        this.setState({ timer });
      } else {
        this.setState({ disabled: true });
      }
    }, secondsInterval);
  };

  handleNext = () => {
    const { magicNumber } = this.state;
    const { dispatch, currentQuest, history } = this.props;
    // let { currentQuest } = this.props;

    // console.log(history, 'history fora do else');
    const currentResult = currentQuest + 1;
    if (currentResult < magicNumber) {
      dispatch(incrementQuest(currentResult));
      // console.log(currentResult, 'currentResult');
      // console.log(currentQuest, 'currentQuest');
    } else {
      history.push('/feedback');
      console.log(history, 'history');
    }
  };

  render() {
    const { category, question, currentQuest } = this.props;
    const {
      showColors, answersOrder, timer, disabled, showNextButton, magicNumber,
    } = this.state;

    if (currentQuest === magicNumber) {
      return console.log('acabou');
    }
    // (<Redirect to="/feedback" />);
    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          { answersOrder.map((answer, index) => (
            <button
              key={ index }
              data-testid={ this.isCorrect(answer) }
              type="button"
              disabled={ disabled }
              className={ showColors ? this.colorSwitch(answer) : '' }
              onClick={ () => this.handleClick(answer) }
            >
              { answer }
            </button>))}
        </div>
        <div>
          {showNextButton
            ? (
              <button
                data-testid="btn-next"
                onClick={ () => this.handleNext() }
              >
                Next Button
              </button>) : null}
        </div>
        <h3>{`Restam ${timer} segundo(s)`}</h3>
      </div>
    );
  }
}

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  currentQuest: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
/*   player: PropTypes.shape({
    score: PropTypes.number,
  }).isRequired, */
};

const mapStateToProps = (globalState) => ({ ...globalState.player });

export default connect(mapStateToProps)(Questions);
