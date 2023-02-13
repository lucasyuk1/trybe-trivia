import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  renderAssertions = () => {
    const { playerAssertions } = this.props;
    const magicNumber = 3;
    return playerAssertions >= magicNumber;
  };

  render() {
    const { playerName, playerScore, playerImage, playerAssertions } = this.props;

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
        <h4 data-testid="header-score">{ playerAssertions }</h4>
        { this.renderAssertions() ? (
          <h5 data-testid="feedback-text">Well Done!</h5>
        ) : (
          <h5 data-testid="feedback-text">Could be better...</h5>)}
      </div>
    );
  }
}

Feedback.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerImage: PropTypes.string.isRequired,
  playerAssertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  playerName: player.name,
  playerScore: player.score,
  playerImage: player.gravatarEmail,
  playerAssertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
