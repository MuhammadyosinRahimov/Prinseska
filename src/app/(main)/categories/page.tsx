'use client';

import Link from 'next/link';
import {
  BookOpenIcon,
  FolderIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { useCategories } from '@/hooks/useCategories';
import { routes } from '@/config';

const categoryColors = [
  'from-purple-500 to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-cyan-500 to-blue-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-amber-500',
  'from-red-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
];

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-6">
              <FolderIcon className="w-4 h-4" />
              <span>Все категории</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Категории книг
            </h1>
            <p className="text-xl text-white/70">
              Выберите интересующую вас область знаний
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-3xl" />
              </div>
            ))}
          </div>
        ) : !categories || (Array.isArray(categories) && categories.length === 0) ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <FolderIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Категории не найдены
            </h3>
            <p className="text-gray-500">
              Категории пока не добавлены
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(Array.isArray(categories) ? categories : []).map((category, index) => (
              <Link key={category.id} href={routes.category(category.id)}>
                <div
                  className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[index % categoryColors.length]} opacity-90`} />

                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <BookOpenIcon className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-center mb-2 group-hover:scale-105 transition-transform">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="text-sm text-white/70 text-center line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    {/* Arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ArrowRightIcon className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
