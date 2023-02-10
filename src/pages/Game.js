import React, { Component } from 'react';
import GameHeader from '../components/GameHeader';
import Questions from '../components/Questions';
import { fetchQuestions } from '../services/apiTrivia';

class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    const questions = data.results;
    this.setState({ questions });
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        {console.log(questions)}
        <GameHeader />
        { questions.map((quest) => (
          <Questions
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

export default Game;
