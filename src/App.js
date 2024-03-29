import React, { useEffect, useState,useRef } from 'react';
import './App.css';
import Header from './components/Header';
import { getRecipes,saveRecipes } from './api/RecipeService';
import { Routes, Route, Navigate } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import UpdateRatingButton from './components/UpdateRatingButton';

function App() {
  const modalRef = useRef()
  const [recipesData, setRecipesData] = useState([]);
  const [values, setValues] = useState({
    title: '',
    instructions: '',
    cookingTime: 0,
    difficultyLevel: '',
    averageRating: 0.0,
    ingredients: '',
  });

  const getAllRecipes = async () => {
    try {
      const response = await getRecipes();
      setRecipesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewRecipe = async (event) => {
    event.preventDefault();
    try {
      const { recipesData } = await saveRecipes(values);
      console.log(recipesData); 
      toggleModal(false);
      setValues({
        title: '',
        instructions: '',
        cookingTime: 0,
        difficultyLevel: '',
        averageRating: 0.0,
        ingredients: '',
      })
      getAllRecipes();
    } catch (error) {
      console.log(error);
    }
  }
  
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };
  const toggleModal = show => show? modalRef.current.showModal() : modalRef.current.close();
  useEffect(() => {
    getAllRecipes();
  }, []);

  const updateRecipe = async (recipe) => {
    try{
      const {recipeData} = await saveRecipes(recipe);
      console.log(recipeData)
    }catch(error)
    {
      console.log(error);
    }

  };

  const toggleFavorite = (recipeId) => {
    const updatedRecipes = recipesData.map(recipe => {
      if (recipe.id === recipeId) {
        return { ...recipe, isFavorite: !recipe.isFavorite };
      }
      return recipe;
    });
    setRecipesData(updatedRecipes);
  };

  return (
    <>
      <Header toggleModal={toggleModal} nbOfRecipes={recipesData.length} />
      <h4 className='PP'> PRANATHI PRAVEEN'S RECIPE MANAGER</h4>
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to={'/recipes'} />} />
            <Route path='/recipes' element={<RecipeList data={recipesData} toggleFavorite={toggleFavorite} />} />
            <Route path="/recipes/:id" element={<RecipeDetail updateRecipe={updateRecipe} />} />
          </Routes>
        </div>
      </main>
      <UpdateRatingButton />
      {/* Modal */}
<dialog ref={modalRef} className="modal" id="modal">
  <div className="modal__header">
    <h3>New Recipe</h3>
    <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
  </div>
  <div className="divider"></div>
  <div className="modal__body">
    <form onSubmit = {handleNewRecipe}>
      <div className="recipe-details">
        <div className="input-box">
          <span className="details">Title</span>
          <input type="text" value={values.title} onChange={onChange} name='title' required />
        </div>
        <div className="input-box">
          <span className="details">Instructions</span>
          <input type="text" value={values.instructions} onChange={onChange} name='instructions' required />
        </div>
        <div className="input-box">
          <span className="details">Cooking Time</span>
          <input type="number" value={values.cookingTime} onChange={onChange}name='cookingTime' required />
        </div>
        <div className="input-box">
          <span className="details">Difficulty Level</span>
          <input type="text" value={values.difficultyLevel} onChange={onChange} name='difficultyLevel' required />
        </div>
        <div className="input-box">
          <span className="details">Average Rating</span>
          <input type="number" value={values.averageRating} onChange={onChange} name='averageRating' required />
        </div>
        <div className="input-box">
          <span className="details">Ingredients</span>
          <input type="text" value={values.ingredients} onChange={onChange} name='ingredients' required />
        </div>
      </div>
      <div className="form_footer">
        <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
        <button type='submit' className="btn">Save</button>
      </div>
    </form>
  </div>
</dialog>


    </>
  );
}

export default App;
