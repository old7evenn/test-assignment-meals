import { fetchAllMeals } from '@api/mealsApi';
import { MealCard } from '@components/MealCard';
import { Pagination } from '@components/Pagination';
import { SearchBar } from '@components/SearchBar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useDebounce } from '../hooks/useDebounce';
import { Meal } from '../types/mealTypes';

const ITEMS_PER_PAGE = 20;

export const AllMeals = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search);

  const queryClient = useQueryClient();
  const { data: selectedMeals = [] } = useQuery({
    queryKey: ['selectedMeals'],
    queryFn: () => queryClient.getQueryData<Meal[]>(['selectedMeals']) || [],
    initialData: [],
  });

  const { data, isLoading } = useQuery({
    queryKey: ['meals', debouncedSearch],
    queryFn: () => fetchAllMeals(debouncedSearch),
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [data, selectedCategory]);

  const filteredMeals =
    data?.meals?.filter(
      meal => !selectedCategory || meal.strCategory === selectedCategory
    ) ?? [];

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);

  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const categories = [...new Set(data?.meals?.map(meal => meal.strCategory))];

  const toggleMealSelection = (meal: Meal) => {
    queryClient.setQueryData(['selectedMeals'], (prev: Meal[] | undefined) => {
      const current = prev || [];

      const isSelected = current.some(
        selected => selected.idMeal === meal.idMeal
      );

      const updatedSelection = isSelected
        ? current.filter(selected => selected.idMeal !== meal.idMeal)
        : [...current, meal];

      return updatedSelection;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar
        onSearch={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : filteredMeals.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedMeals.map(meal => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                onSelect={toggleMealSelection}
                isSelected={selectedMeals.some(
                  selected => selected.idMeal === meal.idMeal
                )}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div>No meals found.</div>
      )}
    </div>
  );
};
