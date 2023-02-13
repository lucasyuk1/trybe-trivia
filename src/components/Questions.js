import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    showColors: false,
    answersOrder: [],
    timer: 30,
    disabled: false,
  };

  componentDidMount() {
    const { answersOrder } = this.state;
    this.defineOrder();
    console.log('ordem :', answersOrder);
    const secondsInterval = 1000;
    setTimeout(() => this.funcTimer(), secondsInterval);
  }

  componentDidUpdate() {
    const { answersOrder } = this.state;
    console.log('ordem update :', answersOrder);
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

  colorCorrect = () => {
    this.setState({ showColors: true });
  };

  defineOrder = () => {
    const { correctAnswer, incorrectAnswers } = this.props;
    let { answersOrder } = this.setState;

    const answers = this.shuffleArray([correctAnswer, ...incorrectAnswers]);

    answersOrder = answers;
    this.setState({ answersOrder });

    return answersOrder;
  };

  funcTimer = () => {
    let { timer, disabled } = this.state;
    const secondsInterval = 1000;
    console.log('rodou functimer');

    setInterval(() => {
      if (timer > 0) {
        timer -= 1;
        this.setState({ timer });
      } else {
        disabled = true;
        this.setState({ disabled });
      }
    }, secondsInterval);
  };

  render() {
    const { category, question } = this.props;
    const { showColors, answersOrder, timer, disabled } = this.state;

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
              onClick={ () => this.colorCorrect(answer) }
            >
              { answer }
            </button>))}
        </div>
        <h3>{`Restam ${timer} segundo(s)`}</h3>
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
