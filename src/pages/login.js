import React, { Component } from 'react';
// import logo from './trivia.png';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  validateInputs = () => {
    const { email, name } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validateEmail = regex.test(email);
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

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header> */}
        <form>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              name="email"
              type="email"
              value={ email }
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
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
