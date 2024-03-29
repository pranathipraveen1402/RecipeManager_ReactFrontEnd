import axios from "axios";

const API_URL = 'http://localhost:8080/recipes';

export async function saveRecipes(recipe) {
    return await axios.post(`${API_URL}/add`, recipe);
}

export async function getRecipes() {
    return await axios.get(API_URL);
}

export async function getRecipe(id) {
    return await axios.get(`${API_URL}/${id}`);
}
export async function updateRating(recipeId, rating) {
    return await axios.post(`${API_URL}/${recipeId}/${rating}`);
}


export async function deleteRecipe(recipeId) {
    try {
      await axios.delete(`${API_URL}/${recipeId}`);
    } catch (error) {
      throw error;
    }
  }