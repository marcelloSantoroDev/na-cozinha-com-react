import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Recipes extends Component {
  render() {
    const { history: { location: { pathname } } } = this.props;

    return (
      <>
        <Header
          showSearch
          // isso aqui abaixo pode mudar ;)
          title={ pathname === '/meals' ? 'Meals' : 'Drinks' }
        />
        <Footer />
      </>
    );
  }
}

Recipes.propTypes = {}.isRequired;

export default connect()(Recipes);
