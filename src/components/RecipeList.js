import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ data,toggleFavorite }) => {
  return (
    <div className='recipe-list'>
      {data.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} linkTo={`/recipes/${recipe.id}`} toggleFavorite={toggleFavorite} /> // Pass the linkTo prop with the appropriate link
      ))}
    </div>
  );
};

export default RecipeList;
