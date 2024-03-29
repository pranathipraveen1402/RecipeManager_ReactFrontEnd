import React, { useState } from 'react';
import { updateRating } from '../api/RecipeService';
import '../index.css';

const UpdateRatingButton = () => {
  const [recipeId, setRecipeId] = useState('');
  const [newRating, setNewRating] = useState('');

  const handleUpdateRating = async () => {
    try {
      await updateRating(recipeId, newRating);
      alert('Rating updated successfully!');
    } catch (error) {
      console.error('Error updating rating:', error);
      alert('Failed to update rating. Please try again.');
    }
  };

  return (
    <div className='update-rating-container'>
      <input
        type='text'
        placeholder='Recipe ID'
        className='update-rating-input'
        value={recipeId}
        onChange={(e) => setRecipeId(e.target.value)}
      />
      <input
        type='number'
        placeholder='New Rating'
        className='update-rating-input'
        value={newRating}
        onChange={(e) => setNewRating(e.target.value)}
      />
      <button className='update-rating-button' onClick={handleUpdateRating}>
        Update Rating
      </button>
    </div>
  );
};

export default UpdateRatingButton;
