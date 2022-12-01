import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

class Recipes extends Component {
  render() {
    const { history: { location: { pathname } } } = this.props;
    const { history } = this.props;
    const { recipes } = this.props;
    const TWELVE = 12;
    return (
      <>
        <Header
          showSearch
          // isso aqui abaixo pode mudar ;)
          history={ history }
          title={ pathname === '/meals' ? 'Meals' : 'Drinks' }
        />
        <section className="card-container">
          { recipes !== null
            && recipes.filter((_e, i) => i < TWELVE).map((recipe, index) => (
              <RecipeCard
                key={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
                thumb={ pathname === '/meals' ? recipe.strMealThumb
                  : recipe.strDrinkThumb }
                recipeName={ pathname === '/meals' ? recipe.strMeal
                  : recipe.strDrink }
                id={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
                pathname={ pathname }
                index={ index }
              />
            ))}
        </section>
        <Footer />
      </>
    );
  }
}

Recipes.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  recipes: state.getRecipesReducer.recipes,
});

export default connect(mapStateToProps)(Recipes);
