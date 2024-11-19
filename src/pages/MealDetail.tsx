import { fetchMealById } from '@api/mealsApi';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

export const MealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['meal', id],
    queryFn: () => fetchMealById(id!),
  });

  const meal = data?.meals?.[0];

  if (isLoading) return <div>Loading...</div>;

  if (!meal) return <div>Recipe not found</div>;

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map(i => ({
      ingredient: meal[`strIngredient${i}`],
      measure: meal[`strMeasure${i}`],
    }))
    .filter(({ ingredient }) => ingredient && ingredient.trim());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{meal.strMeal}</h1>
        <button
          className="bg-gray-200 rounded-sm p-1 px-2"
          onClick={() => navigate('/')}
        >
          ← back
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded-lg"
          />
          <div className="mt-4">
            <span className="bg-gray-100 px-3 py-1 rounded-full mr-2">
              {meal.strCategory}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {meal.strArea}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {ingredients.map(({ ingredient, measure }, index) => (
              <li key={index}>
                {ingredient} - {measure}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">Instructions</h2>

          <p className="whitespace-pre-line">{meal.strInstructions}</p>

          {meal.strYoutube && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Video Tutorial</h2>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
