import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveRanking, incrementQuest } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    this.setRanking();
  }

  componentDidUpdate() {
    this.sendLocalStorage();
  }

  setRanking = () => {
    const { playerName, playerScore, playerImage, dispatch } = this.props;
    const playerJson = { playerName, playerScore, playerImage };
    dispatch(saveRanking(playerJson));
  };

  sendLocalStorage = () => {
    const { rankingList } = this.props;
    localStorage.setItem('userRankings', JSON.stringify(rankingList));
  };

  renderAssertions = () => {
    const { playerAssertions } = this.props;
    const magicNumber = 3;
    return playerAssertions >= magicNumber;
  };

  handlePlayAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(incrementQuest(0));
    history.push('/');
  };

  render() {
    const { playerName, playerScore, playerImage, playerAssertions,
      history } = this.props;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ playerImage }
          alt={ `Imagem de ${playerName}` }
        />
        <h3
          data-testid="header-player-name"
        >
          { playerName }
        </h3>
        <h4 data-testid="header-score">{ playerScore }</h4>

        { this.renderAssertions() ? (
          <h5 data-testid="feedback-text">Well Done!</h5>
        ) : (
          <h5 data-testid="feedback-text">Could be better...</h5>)}

        <h5 data-testid="feedback-total-score">{ playerScore }</h5>
        <h5 data-testid="feedback-total-question">{ playerAssertions }</h5>

        <button
          type="button"
          className="navigation-btn"
          data-testid="btn-play-again"
          onClick={ () => this.handlePlayAgain() }
        >
          Play Again
        </button>
        <button
          type="button"
          className="navigation-btn"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerImage: PropTypes.string.isRequired,
  playerAssertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  rankingList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ player }) => ({
  playerName: player.name,
  playerScore: player.score,
  playerImage: player.gravatarEmail,
  playerAssertions: player.assertions,
  rankingList: player.rankingList,
});

export default connect(mapStateToProps)(Feedback);
