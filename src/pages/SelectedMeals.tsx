import { fetchMealById } from '@api/mealsApi';
import { MealCard } from '@components/MealCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Meal } from '../types/mealTypes';

export const SelectedMeals = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const selectedMeals =
    queryClient.getQueryData<Meal[]>(['selectedMeals']) || [];

  const { data: recipesData } = useQuery({
    queryKey: ['selectedMealsDetails', selectedMeals],
    queryFn: () =>
      Promise.all(selectedMeals.map(meal => fetchMealById(meal.idMeal))),
    enabled: selectedMeals.length > 0,
  });

  const selectedRecipes = recipesData?.map(response => response.meals[0]) ?? [];

  const getAllIngredients = () => {
    const ingredientMap = new Map<string, string[]>();

    selectedRecipes.forEach(recipe => {
      Array.from({ length: 20 }, (_, i) => i + 1).forEach(i => {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
          if (!ingredientMap.has(ingredient)) {
            ingredientMap.set(ingredient, []);
          }

          ingredientMap.get(ingredient)?.push(`${measure} (${recipe.strMeal})`);
        }
      });
    });

    return ingredientMap;
  };

  const removeMeal = (idMeal: string) => {
    const updatedSelection = selectedMeals.filter(
      meal => meal.idMeal !== idMeal
    );
    queryClient.setQueryData(['selectedMeals'], updatedSelection);
  };

  if (!selectedMeals.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl mb-4">No Meals selected</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 border-2 border-gray-200 rounded-md hover:bg-gray-200"
        >
          Browse Meals
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Selected Meals</h1>
        <button
          className="bg-gray-200 rounded-sm p-1 px-2"
          onClick={() => navigate('/')}
        >
          ← back
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Meals</h2>
          <div className="space-y-4">
            {selectedRecipes.map(recipe => (
              <MealCard
                key={recipe.idMeal}
                meal={recipe}
                instructions={recipe.strInstructions}
                isSelected
                onSelect={() => removeMeal(recipe.idMeal)}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Combined Ingredients</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {Array.from(getAllIngredients()).map(([ingredient, measures]) => (
              <div key={ingredient} className="mb-4">
                <h3 className="font-medium">{ingredient}</h3>
                <ul className="ml-4">
                  {measures.map((measure, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
