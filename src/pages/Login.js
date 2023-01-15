import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions';
import './css/Login.css';
import logo from './css/images/logo-correto.png';

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
    const checkPassword = password.length > SIX;
    const validate = checkEmail && checkPassword;
    this.setState({ isButtonDisabled: !validate });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    const emailUserObjectToSave = { email };
    localStorage.setItem('user', JSON.stringify(emailUserObjectToSave));
    history.push('/meals');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <div className="all-container">
        <img src={ logo } alt="logo" className="logo-login" />
        <div className="login-container">
          <input
            name="email"
            value={ email }
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            placeholder="Digite seu email"
          />
          <input
            name="password"
            value={ password }
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            placeholder="Digite sua senha"
          />
          <button
            disabled={ isButtonDisabled }
            type="button"
            data-testid="login-submit-btn"
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {}.isRequired;

export default connect()(Login);
