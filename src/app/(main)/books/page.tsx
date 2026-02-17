'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpenIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Pagination } from '@/components/ui/Pagination';
import { useBooks } from '@/hooks/useBooks';
import { useCategories } from '@/hooks/useCategories';
import { useAudiences } from '@/hooks/useAudiences';
import { BookFilters, BookDifficulty } from '@/types';
import { routes, config } from '@/config';
import { formatBytes } from '@/lib/utils';

const difficultyOptions = [
  { value: '', label: 'Все уровни' },
  { value: 'Beginner', label: 'Начинающий' },
  { value: 'Intermediate', label: 'Средний' },
  { value: 'Advanced', label: 'Продвинутый' },
];

const sortOptions = [
  { value: 'createdAt-desc', label: 'Новые' },
  { value: 'createdAt-asc', label: 'Старые' },
  { value: 'title-asc', label: 'По названию (А-Я)' },
  { value: 'title-desc', label: 'По названию (Я-А)' },
  { value: 'downloadCount-desc', label: 'Популярные' },
];

export default function BooksPage() {
  const [filters, setFilters] = useState<BookFilters>({
    page: 1,
    pageSize: 12,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useBooks(filters);
  const { data: categories } = useCategories();
  const { data: audiences } = useAudiences();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchValue, page: 1 }));
  };

  const handleFilterChange = (key: keyof BookFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: 1,
    }));
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder: sortOrder as 'asc' | 'desc',
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({ page: 1, pageSize: 12 });
    setSearchValue('');
  };

  const hasActiveFilters =
    filters.search ||
    filters.categoryId ||
    filters.audienceId ||
    filters.difficulty;

  const categoryOptions = [
    { value: '', label: 'Все категории' },
    ...(Array.isArray(categories) ? categories.map((c) => ({ value: c.id, label: c.name })) : []),
  ];

  const audienceOptions = [
    { value: '', label: 'Все аудитории' },
    ...(Array.isArray(audiences) ? audiences.map((a) => ({ value: a.id, label: a.name })) : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Каталог книг
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Найдите нужную книгу среди тысяч научных материалов
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Поиск по названию или автору..."
                  className="w-full pl-14 pr-32 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all"
                >
                  Найти
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* Filters Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 ${showFilters ? 'bg-purple-50 border-purple-300 text-purple-700' : ''}`}
            >
              <FunnelIcon className="h-5 w-5" />
              Фильтры
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              )}
            </Button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
                Сбросить фильтры
              </button>
            )}

            <div className="ml-auto">
              <span className="text-sm text-gray-500">
                Найдено: <span className="font-semibold text-gray-900">{data?.totalCount || 0}</span> книг
              </span>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg animate-fade-in-down">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                  label="Категория"
                  options={categoryOptions}
                  value={filters.categoryId || ''}
                  onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                />
                <Select
                  label="Аудитория"
                  options={audienceOptions}
                  value={filters.audienceId || ''}
                  onChange={(e) => handleFilterChange('audienceId', e.target.value)}
                />
                <Select
                  label="Уровень"
                  options={difficultyOptions}
                  value={filters.difficulty || ''}
                  onChange={(e) =>
                    handleFilterChange('difficulty', e.target.value as BookDifficulty)
                  }
                />
                <Select
                  label="Сортировка"
                  options={sortOptions}
                  value={`${filters.sortBy || 'createdAt'}-${filters.sortOrder || 'desc'}`}
                  onChange={(e) => handleSortChange(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-3xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : !data?.items || data.items.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <BookOpenIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Книги не найдены
            </h3>
            <p className="text-gray-500 mb-6">
              Попробуйте изменить параметры поиска
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Сбросить фильтры
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.items?.map((book, index) => (
                <Link key={book.id} href={routes.book(book.id)}>
                  <div
                    className="group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Book Card */}
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                      {/* Background */}
                      <div className={`absolute inset-0 ${
                        !book.images?.[0]
                          ? `bg-gradient-to-br ${
                              ['from-purple-500 via-pink-500 to-rose-500',
                               'from-cyan-500 via-blue-500 to-indigo-500',
                               'from-emerald-500 via-teal-500 to-cyan-500',
                               'from-orange-500 via-red-500 to-pink-500',
                               'from-violet-500 via-purple-500 to-fuchsia-500',
                               'from-blue-500 via-indigo-500 to-violet-500'][index % 6]
                            }`
                          : ''
                      }`}>
                        {book.images?.[0] ? (
                          <img
                            src={book.images[0].imageUrl}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <BookOpenIcon className="w-10 h-10 text-white" />
                            </div>
                            <p className="text-white/80 text-sm font-medium text-center line-clamp-2">{book.title}</p>
                          </div>
                        )}
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                          book.difficulty === 'Beginner'
                            ? 'bg-green-500/80 text-white'
                            : book.difficulty === 'Intermediate'
                            ? 'bg-yellow-500/80 text-white'
                            : 'bg-red-500/80 text-white'
                        }`}>
                          {config.difficultyLabels[book.difficulty]}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-white font-bold text-lg mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-white/70 text-sm mb-3">{book.author}</p>

                        <div className="flex items-center justify-between text-white/60 text-sm">
                          <span className="flex items-center gap-1">
                            <DocumentTextIcon className="w-4 h-4" />
                            {formatBytes(book.fileSize)}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            {book.downloadCount}
                          </span>
                        </div>
                      </div>

                      {/* Hover Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                          Подробнее
                        </span>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {data && data.totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={data.page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
