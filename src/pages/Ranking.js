import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementQuest } from '../redux/actions';

class Ranking extends Component {
  state = {
    ordernedList: [],
  };

  componentDidMount() {
    this.orderList();
  }

  orderList = () => {
    const { rankingList } = this.props;
    const orderned = rankingList.sort((a, b) => b.playerScore - a.playerScore);
    this.setState({ ordernedList: orderned });
    // console.log('ranklist order: ', orderned);
  };

  handlePlayAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(incrementQuest(0));
    history.push('/');
  };

  render() {
    const { ordernedList } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ordernedList.map(({ playerImage, playerName, playerScore }, index) => (
          <div key={ index }>
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${md5(playerImage).toString()}` }
              alt="avatar"
            />
            <p data-testid={ `player-name-${index}` }>{ playerName }</p>
            <p data-testid={ `player-score-${index}` }>{ playerScore }</p>
          </div>))}
        <button
          type="button"
          className='navigation-btn'
          data-testid="btn-go-home"
          onClick={ () => this.handlePlayAgain() }
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  rankingList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (globalState) => ({ ...globalState.player });

export default connect(mapStateToProps)(Ranking);
