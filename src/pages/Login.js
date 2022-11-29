import React, { Component } from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton());
  };

  validateButton = () => {
    const { email, password } = this.state;
    const SIX = 6;
    const regex = /\S+@\S+\.\S+/;
    const checkEmail = regex.test(email);
    const checkPassword = password.length >= SIX;
    const validate = checkEmail && checkPassword;
    this.setState({ isButtonDisabled: !validate });
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <div>
        <input
          name="email"
          value={ email }
          type="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          value={ password }
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          disabled={ isButtonDisabled }
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar

        </button>
      </div>
    );
  }
}

export default Login;
