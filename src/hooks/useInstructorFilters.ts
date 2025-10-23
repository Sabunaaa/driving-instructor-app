import { useState, useCallback } from 'react';

export interface FilterOptions {
  budget: [number, number];
  rating: number;
  experience: number;
  transmissionType: string;
  city: string;
  specialty: string;
  weekdays: string[];
}

const initialFilters: FilterOptions = {
  budget: [40, 100],
  rating: 0,
  experience: 0,
  transmissionType: '',
  city: '',
  specialty: '',
  weekdays: [],
};

export const useInstructorFilters = () => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const updateFilter = useCallback((key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateBudget = useCallback((budget: [number, number]) => {
    setFilters(prev => ({ ...prev, budget }));
  }, []);

  const toggleWeekday = useCallback((day: string) => {
    setFilters(prev => ({
      ...prev,
      weekdays: prev.weekdays.includes(day)
        ? prev.weekdays.filter(d => d !== day)
        : [...prev.weekdays, day],
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = useCallback(() => {
    return (
      filters.budget[0] !== initialFilters.budget[0] ||
      filters.budget[1] !== initialFilters.budget[1] ||
      filters.rating > 0 ||
      filters.experience > 0 ||
      filters.transmissionType !== '' ||
      filters.city !== '' ||
      filters.specialty !== '' ||
      filters.weekdays.length > 0
    );
  }, [filters]);

  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.budget[0] !== initialFilters.budget[0] || filters.budget[1] !== initialFilters.budget[1]) count++;
    if (filters.rating > 0) count++;
    if (filters.experience > 0) count++;
    if (filters.transmissionType !== '') count++;
    if (filters.city !== '') count++;
    if (filters.specialty !== '') count++;
    if (filters.weekdays.length > 0) count++;
    return count;
  }, [filters]);

  return {
    filters,
    updateFilter,
    updateBudget,
    toggleWeekday,
    resetFilters,
    hasActiveFilters,
    getActiveFilterCount,
  };
};
