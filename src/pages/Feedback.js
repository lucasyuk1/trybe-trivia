// import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    // const { playerName, playerScore } = this.props;

    return (
      <div>
        oi
        {/* <img
          data-testid="header-profile-picture"
          src=" "
          alt={ `Imagem de ${playerName}` }
        />
        <h3
          data-testid="header-player-name"
        >
          {playerName}
        </h3>
        <h4 data-testid="header-score">{playerScore}</h4> */}
      </div>
    );
  }
}

// Feedback.propTypes = {
//   playerName: PropTypes.string.isRequired,
//   playerScore: PropTypes.string.isRequired,
// };

// const mapStateToProps = ({ player }) => ({
//   playerName: player.name,
//   playerScore: player.score,
// });

export default Feedback;
