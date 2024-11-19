import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AllMeals } from './pages/AllMeals';
import { MealDetail } from './pages/MealDetail';
import { SelectedMeals } from './pages/SelectedMeals';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllMeals />} />
        <Route path="/meal/:id" element={<MealDetail />} />
        <Route path="/selecrted-meals" element={<SelectedMeals />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
