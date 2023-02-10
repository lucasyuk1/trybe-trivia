import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions';
import { fetchToken } from '../services/apiTrivia';
// import logo from './trivia.png';

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',
    isDisabled: true,
  };

  validateInputs = () => {
    const { gravatarEmail, name } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validateEmail = regex.test(gravatarEmail);
    if (validateEmail && name.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      { [name]: value },
      () => this.validateInputs(),
    );
  };

  handleClick = async () => {
    const { name, gravatarEmail } = this.state;
    const data = await fetchToken();
    const { token } = data;
    localStorage.setItem('token', token);
    const { history, dispatch } = this.props;
    dispatch(submitLogin({ name, gravatarEmail }));
    history.push('/game');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { gravatarEmail, name, isDisabled } = this.state;
    return (
      <div>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header> */}
        <form>
          <label htmlFor="gravatarEmail">
            Email:
            <input
              id="gravatarEmail"
              name="gravatarEmail"
              type="email"
              value={ gravatarEmail }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              name="name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleClickSettings }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
