import { MealsResponse } from '../types/mealTypes';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchAllMeals = async (search = ''): Promise<MealsResponse> => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const recipesPromises = alphabet.map(async letter => {
    const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes for letter: ${letter}`);
    }

    const data = await response.json();

    return data.meals || [];
  });

  const recipesResults = await Promise.all(recipesPromises);

  const filteredMeals = recipesResults
    .flat()
    .filter(meal => meal.strMeal.toLowerCase().includes(search.toLowerCase()));

  return { meals: filteredMeals };
};

export const fetchMealById = async (id: string): Promise<MealsResponse> => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

  return response.json();
};
