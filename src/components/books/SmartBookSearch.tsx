'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  UsersIcon,
  LanguageIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { BookFilters, BookDifficulty, Category, Audience } from '@/types';
import { config } from '@/config';

interface SmartBookSearchProps {
  filters: BookFilters;
  onFiltersChange: (filters: BookFilters) => void;
  categories: Category[];
  audiences: Audience[];
  totalResults?: number;
  isLoading?: boolean;
}

const difficultyOptions: { value: BookDifficulty | ''; label: string; color: string }[] = [
  { value: '', label: 'Все уровни', color: 'bg-gray-100 text-gray-700' },
  { value: 'Beginner', label: 'Начинающий', color: 'bg-green-100 text-green-700' },
  { value: 'Intermediate', label: 'Средний', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'Advanced', label: 'Продвинутый', color: 'bg-red-100 text-red-700' },
];

const languageOptions = [
  { value: '', label: 'Все языки' },
  { value: 'Русский', label: 'Русский' },
  { value: 'Тоҷикӣ', label: 'Тоҷикӣ' },
  { value: 'English', label: 'English' },
];

const sortOptions = [
  { value: 'createdAt-desc', label: 'Сначала новые', icon: '🆕' },
  { value: 'createdAt-asc', label: 'Сначала старые', icon: '📅' },
  { value: 'title-asc', label: 'По названию (А-Я)', icon: '🔤' },
  { value: 'title-desc', label: 'По названию (Я-А)', icon: '🔠' },
  { value: 'downloadCount-desc', label: 'По популярности', icon: '🔥' },
  { value: 'rating-desc', label: 'По рейтингу', icon: '⭐' },
];

export function SmartBookSearch({
  filters,
  onFiltersChange,
  categories,
  audiences,
  totalResults = 0,
  isLoading = false,
}: SmartBookSearchProps) {
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filters.search) {
        onFiltersChange({ ...filters, search: searchValue || undefined, page: 1 });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleFilterChange = useCallback(
    (key: keyof BookFilters, value: string | undefined) => {
      onFiltersChange({
        ...filters,
        [key]: value || undefined,
        page: 1,
      });
      setActiveDropdown(null);
    },
    [filters, onFiltersChange]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const [sortBy, sortOrder] = value.split('-');
      onFiltersChange({
        ...filters,
        sortBy,
        sortOrder: sortOrder as 'asc' | 'desc',
        page: 1,
      });
      setActiveDropdown(null);
    },
    [filters, onFiltersChange]
  );

  const clearAllFilters = useCallback(() => {
    setSearchValue('');
    onFiltersChange({ page: 1, pageSize: filters.pageSize });
  }, [filters.pageSize, onFiltersChange]);

  const clearSearch = useCallback(() => {
    setSearchValue('');
    onFiltersChange({ ...filters, search: undefined, page: 1 });
    searchInputRef.current?.focus();
  }, [filters, onFiltersChange]);

  const activeFiltersCount = [
    filters.search,
    filters.categoryId,
    filters.audienceId,
    filters.difficulty,
    filters.language,
  ].filter(Boolean).length;

  const currentSort = `${filters.sortBy || 'createdAt'}-${filters.sortOrder || 'desc'}`;
  const currentSortLabel = sortOptions.find((s) => s.value === currentSort)?.label || 'Сортировка';

  const getCategoryName = (id: string) => categories.find((c) => c.id === id)?.name || '';
  const getAudienceName = (id: string) => audiences.find((a) => a.id === id)?.name || '';

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className={cn(
              'w-6 h-6 transition-colors',
              isLoading ? 'text-purple-500 animate-pulse' : 'text-gray-400'
            )} />
          </div>

          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Поиск по названию, автору, описанию..."
            className={cn(
              'w-full pl-14 pr-32 py-4 text-lg',
              'bg-white border-2 border-gray-200 rounded-2xl',
              'placeholder:text-gray-400 text-gray-900',
              'focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100',
              'transition-all duration-200',
              'shadow-sm hover:shadow-md'
            )}
          />

          <div className="absolute right-3 flex items-center gap-2">
            {searchValue && (
              <button
                onClick={clearSearch}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
                showAdvanced
                  ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              )}
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Фильтры</span>
              {activeFiltersCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-bold bg-purple-500 text-white rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="text-sm text-gray-500">
            {isLoading ? (
              <span className="animate-pulse">Поиск...</span>
            ) : (
              <>
                Найдено: <span className="font-semibold text-gray-900">{totalResults}</span> книг
              </>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
              Сбросить все
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div
          ref={dropdownRef}
          className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg animate-fade-in-down"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Category Filter */}
            <FilterDropdown
              label="Категория"
              icon={<BookOpenIcon className="w-5 h-5" />}
              value={filters.categoryId ? getCategoryName(filters.categoryId) : 'Все категории'}
              isActive={activeDropdown === 'category'}
              onToggle={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
              hasValue={!!filters.categoryId}
            >
              <div className="max-h-64 overflow-y-auto">
                <DropdownOption
                  label="Все категории"
                  isSelected={!filters.categoryId}
                  onClick={() => handleFilterChange('categoryId', undefined)}
                />
                {categories.map((category) => (
                  <DropdownOption
                    key={category.id}
                    label={category.name}
                    isSelected={filters.categoryId === category.id}
                    onClick={() => handleFilterChange('categoryId', category.id)}
                  />
                ))}
              </div>
            </FilterDropdown>

            {/* Audience Filter */}
            <FilterDropdown
              label="Аудитория"
              icon={<UsersIcon className="w-5 h-5" />}
              value={filters.audienceId ? getAudienceName(filters.audienceId) : 'Все аудитории'}
              isActive={activeDropdown === 'audience'}
              onToggle={() => setActiveDropdown(activeDropdown === 'audience' ? null : 'audience')}
              hasValue={!!filters.audienceId}
            >
              <div className="max-h-64 overflow-y-auto">
                <DropdownOption
                  label="Все аудитории"
                  isSelected={!filters.audienceId}
                  onClick={() => handleFilterChange('audienceId', undefined)}
                />
                {audiences.map((audience) => (
                  <DropdownOption
                    key={audience.id}
                    label={audience.name}
                    isSelected={filters.audienceId === audience.id}
                    onClick={() => handleFilterChange('audienceId', audience.id)}
                  />
                ))}
              </div>
            </FilterDropdown>

            {/* Difficulty Filter */}
            <FilterDropdown
              label="Уровень"
              icon={<AcademicCapIcon className="w-5 h-5" />}
              value={filters.difficulty ? config.difficultyLabels[filters.difficulty] : 'Все уровни'}
              isActive={activeDropdown === 'difficulty'}
              onToggle={() => setActiveDropdown(activeDropdown === 'difficulty' ? null : 'difficulty')}
              hasValue={!!filters.difficulty}
            >
              {difficultyOptions.map((option) => (
                <DropdownOption
                  key={option.value}
                  label={option.label}
                  isSelected={filters.difficulty === option.value || (!filters.difficulty && !option.value)}
                  onClick={() => handleFilterChange('difficulty', option.value || undefined)}
                  badge={option.value && (
                    <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', option.color)}>
                      {option.label}
                    </span>
                  )}
                />
              ))}
            </FilterDropdown>

            {/* Language Filter */}
            <FilterDropdown
              label="Язык"
              icon={<LanguageIcon className="w-5 h-5" />}
              value={filters.language || 'Все языки'}
              isActive={activeDropdown === 'language'}
              onToggle={() => setActiveDropdown(activeDropdown === 'language' ? null : 'language')}
              hasValue={!!filters.language}
            >
              {languageOptions.map((option) => (
                <DropdownOption
                  key={option.value}
                  label={option.label}
                  isSelected={filters.language === option.value || (!filters.language && !option.value)}
                  onClick={() => handleFilterChange('language', option.value || undefined)}
                />
              ))}
            </FilterDropdown>

            {/* Sort */}
            <FilterDropdown
              label="Сортировка"
              icon={<ArrowsUpDownIcon className="w-5 h-5" />}
              value={currentSortLabel}
              isActive={activeDropdown === 'sort'}
              onToggle={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
              hasValue={false}
            >
              {sortOptions.map((option) => (
                <DropdownOption
                  key={option.value}
                  label={option.label}
                  isSelected={currentSort === option.value}
                  onClick={() => handleSortChange(option.value)}
                  prefix={<span className="mr-2">{option.icon}</span>}
                />
              ))}
            </FilterDropdown>
          </div>

          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Активные фильтры:</span>

                {filters.search && (
                  <FilterTag
                    label={`Поиск: "${filters.search}"`}
                    onRemove={() => { setSearchValue(''); handleFilterChange('search', undefined); }}
                  />
                )}

                {filters.categoryId && (
                  <FilterTag
                    label={`Категория: ${getCategoryName(filters.categoryId)}`}
                    onRemove={() => handleFilterChange('categoryId', undefined)}
                  />
                )}

                {filters.audienceId && (
                  <FilterTag
                    label={`Аудитория: ${getAudienceName(filters.audienceId)}`}
                    onRemove={() => handleFilterChange('audienceId', undefined)}
                  />
                )}

                {filters.difficulty && (
                  <FilterTag
                    label={`Уровень: ${config.difficultyLabels[filters.difficulty]}`}
                    onRemove={() => handleFilterChange('difficulty', undefined)}
                    color={
                      filters.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : filters.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        : 'bg-red-100 text-red-700 border-red-200'
                    }
                  />
                )}

                {filters.language && (
                  <FilterTag
                    label={`Язык: ${filters.language}`}
                    onRemove={() => handleFilterChange('language', undefined)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Filter Dropdown Component
interface FilterDropdownProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  isActive: boolean;
  onToggle: () => void;
  hasValue: boolean;
  children: React.ReactNode;
}

function FilterDropdown({
  label,
  icon,
  value,
  isActive,
  onToggle,
  hasValue,
  children,
}: FilterDropdownProps) {
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border-2 transition-all',
          isActive
            ? 'border-purple-500 bg-purple-50 ring-4 ring-purple-100'
            : hasValue
            ? 'border-purple-300 bg-purple-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className={cn('flex-shrink-0', hasValue ? 'text-purple-600' : 'text-gray-400')}>
            {icon}
          </span>
          <span className={cn(
            'truncate text-sm font-medium',
            hasValue ? 'text-purple-700' : 'text-gray-700'
          )}>
            {value}
          </span>
        </div>
        <ChevronDownIcon className={cn(
          'w-4 h-4 flex-shrink-0 transition-transform',
          isActive ? 'rotate-180 text-purple-500' : 'text-gray-400'
        )} />
      </button>

      {isActive && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-fade-in-down">
          {children}
        </div>
      )}
    </div>
  );
}

// Dropdown Option Component
interface DropdownOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  badge?: React.ReactNode;
  prefix?: React.ReactNode;
}

function DropdownOption({ label, isSelected, onClick, badge, prefix }: DropdownOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-4 py-3 text-left text-sm transition-colors',
        isSelected
          ? 'bg-purple-50 text-purple-700 font-medium'
          : 'text-gray-700 hover:bg-gray-50'
      )}
    >
      {prefix}
      <span className="flex-1">{badge || label}</span>
      {isSelected && (
        <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

// Filter Tag Component
interface FilterTagProps {
  label: string;
  onRemove: () => void;
  color?: string;
}

function FilterTag({ label, onRemove, color = 'bg-purple-100 text-purple-700 border-purple-200' }: FilterTagProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border',
      color
    )}>
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </span>
  );
}
