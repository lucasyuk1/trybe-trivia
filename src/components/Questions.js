import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  render() {
    const { category, question } = this.props;

    return (
      <div>
        <h2 data-test-id="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
      </div>
    );
  }
}

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default Questions;
