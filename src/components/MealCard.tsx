import React from 'react';
import { Link } from 'react-router-dom';

import { Meal } from '../types/mealTypes';

interface MealCardProps {
  meal: Meal;
  onSelect?: (meal: Meal) => void;
  isSelected?: boolean;
  instructions?: string;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  onSelect,
  isSelected,
  instructions,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Link to={`/meal/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/meal/${meal.idMeal}`}
          className="text-xl font-semibold hover:text-blue-600"
        >
          {meal.strMeal}
        </Link>
        <div className="mt-2 flex flex-wrap gap-2 items-center">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
            {meal.strCategory}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
            {meal.strArea}
          </span>
          {onSelect && (
            <button
              onClick={() => onSelect(meal)}
              className={`ml-auto p-2 rounded-md transition-colors ${
                isSelected ? 'bg-blue-400 text-white' : 'hover:opacity-75'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path d="M 16.5 5 C 12.928062 5 10 7.9280619 10 11.5 L 10 41.5 A 1.50015 1.50015 0 0 0 12.376953 42.716797 L 24 34.347656 L 35.623047 42.716797 A 1.50015 1.50015 0 0 0 38 41.5 L 38 11.5 C 38 7.9280619 35.071938 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 33.450062 8 35 9.5499381 35 11.5 L 35 38.572266 L 24.876953 31.283203 A 1.50015 1.50015 0 0 0 23.123047 31.283203 L 13 38.572266 L 13 11.5 C 13 9.5499381 14.549938 8 16.5 8 z"></path>
              </svg>
            </button>
          )}
          <p>{instructions}</p>
        </div>
      </div>
    </div>
  );
};
