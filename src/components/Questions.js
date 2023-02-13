import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    showColors: false,
  };

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

  colorCorrect = () => {
    this.setState({ showColors: true });
  };

  render() {
    const { category, question, correctAnswer, incorrectAnswers } = this.props;

    const answers = this.shuffleArray([correctAnswer, ...incorrectAnswers]);

    const { showColors } = this.state;

    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          { answers.map((answer, index) => (
            <button
              key={ index }
              data-testid={ this.isCorrect(answer) }
              type="button"
              className={ showColors ? this.colorSwitch(answer) : '' }
              onClick={ () => this.colorCorrect(answer) }
            >
              { answer }
            </button>))}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.node.isRequired,
};

export default Questions;
