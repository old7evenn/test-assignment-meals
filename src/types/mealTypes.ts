export interface Ingredient {
  strIngredient: string;
  strMeasure: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  [key: string]: string | null | undefined;
}

export interface MealsResponse {
  meals: Meal[];
}

export interface Category {
  strCategory: string;
}
