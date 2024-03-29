import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getRecipe,deleteRecipe } from '../api/RecipeService';
import { Link } from 'react-router-dom';
import '../index.css';

const RecipeDetail = ({ updateRecipe }) => {
  const [recipe, setRecipe] = useState({
    id: '',
    title: '',
    instructions: '',
    cookingTime: 0,
    difficultyLevel: '',
    averageRating: 0.0,
    ingredients: '',
  });

  const { id } = useParams();
  const fetchRecipe = async () => {
    try {
      const response = await getRecipe(id);
      if (response && response.data) {
        setRecipe(response.data);
        console.log(response.data); // Log the fetched data
      } else {
        console.log('No data received from the server');
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };
  useEffect(() => {
       fetchRecipe();
  }, [id]);

  const onChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const onUpdateRecipe = async (event) => {
    event.preventDefault();
    await updateRecipe(recipe);
    fetchRecipe(id);
  };

  const handleDeleteRecipe = async () => {
    try {
      await deleteRecipe(id);
      alert('Recipe deleted successfully!');
      return <Navigate to="/recipes" replace />;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  return (
    <>
      <Link to={'/recipes'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
      <div className='profile'>
        <div className='profile__settings'>
          <div>
            <form onSubmit={onUpdateRecipe} className="form">
              <div className="user-details">
                <input type="hidden" defaultValue={recipe.id} name="id" required />
                <div className="input-box">
                  <span className="details">Title</span>
                  <input type="text" value={recipe.title} onChange={onChange} name="title" required />
                </div>
                <div className="input-box">
                  <span className="details">Instructions</span>
                  <input type="text" value={recipe.instructions} onChange={onChange} name="instructions" required />
                </div>
                <div className="input-box">
                  <span className="details">Cooking Time</span>
                  <input type="text" value={recipe.cookingTime} onChange={onChange} name="cookingTime" required />
                </div>
                <div className="input-box">
                  <span className="details">Difficulty Level</span>
                  <input type="text" value={recipe.difficultyLevel} onChange={onChange} name="difficultyLevel" required />
                </div>
                <div className="input-box">
                  <span className="details">Average Rating</span>
                  <input type="text" value={recipe.averageRating} onChange={onChange} name="averageRating" required />
                </div>
                <div className="input-box">
                  <span className="details">Ingredients</span>
                  <input type="text" value={recipe.ingredients} onChange={onChange} name="ingredients" required />
                </div>
              </div>
              <div className="form_footer">
                <button type="submit" className="btn">Save</button>
              </div>
            </form>
            <button className='delete-recipe-button' onClick={handleDeleteRecipe}>
                 <i className='bi bi-trash'></i> Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
