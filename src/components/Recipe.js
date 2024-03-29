import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.id}`} className="contact__item">
      <div className="contact__header">
        <p className="contact_id">{recipe.id}</p>
        <div className="contact__details">
          <p className="contact_title">{recipe.title}</p>
        </div>
      </div>
      <div className="contact__body">
        <p><i className="bi bi-book"></i>Instructions: {recipe.instructions}</p>
        <p><i className="bi bi-alarm"></i>Cooking Time: {recipe.cookingTime}</p>
        <p><i className="bi bi-water"></i>Difficulty Level: {recipe.difficultyLevel}</p>
        <p><i className="bi bi-5-square"></i>Average Rating: {recipe.averageRating}</p>
        <p><i className="fas fa-pepper-hot" style={{ fontSize: '24px' }}></i>Ingredients: {recipe.ingredients}</p>
      </div>
    </Link>
  );
}

export default Recipe;
