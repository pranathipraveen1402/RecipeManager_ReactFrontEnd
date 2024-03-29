import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const RecipeCard = ({ recipe, linkTo, toggleFavorite}) => {
  
  return (
    <Link to={linkTo} className='recipe-card'>
      <div>
        <h2>{recipe.title}</h2>
        <p><b>Instructions : </b>{recipe.instructions}</p>
        <p><b>Cooking Time: </b>{recipe.cookingTime} minutes</p>
        <p><b>Difficulty Level: </b>{recipe.difficultyLevel}</p>
        <p><b>Average Rating: </b>{recipe.averageRating}</p>
        <p><b>Ingredients: </b>{recipe.ingredients}</p>
        <button onClick={() => toggleFavorite(recipe.id)}>
            <FontAwesomeIcon icon={recipe.isFavorite ? solidStar : regularStar} />
        </button>
      </div>
    </Link>
  );
};

export default RecipeCard;
