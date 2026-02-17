'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ArrowRightIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { useBooks } from '@/hooks/useBooks';
import { useCategories } from '@/hooks/useCategories';
import { routes, config } from '@/config';
import { formatBytes } from '@/lib/utils';

const features = [
  {
    icon: BookOpenIcon,
    title: 'Широкий выбор',
    description: 'Тысячи научных книг по различным направлениям',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: AcademicCapIcon,
    title: 'Для всех уровней',
    description: 'Материалы от начинающих до продвинутых',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: ArrowDownTrayIcon,
    title: 'Бесплатное скачивание',
    description: 'Скачивайте книги в формате PDF бесплатно',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Умный поиск',
    description: 'Находите нужные материалы за секунды',
    color: 'from-orange-500 to-red-500',
  },
];

const stats = [
  { icon: BookOpenIcon, value: '10,000+', label: 'Книг' },
  { icon: UserGroupIcon, value: '50,000+', label: 'Пользователей' },
  { icon: ArrowDownTrayIcon, value: '100,000+', label: 'Скачиваний' },
  { icon: DocumentTextIcon, value: '500+', label: 'Авторов' },
];

export default function HomePage() {
  const { data: booksData, isLoading: booksLoading } = useBooks({ pageSize: 8 });
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <Container className="relative z-10">
            <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-8 animate-fade-in-down">
                <SparklesIcon className="w-4 h-4 text-yellow-400" />
                <span>Добро пожаловать в мир знаний</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                 Prinseska 💘

                </span>
                <br />
                <span className="text-3xl md:text-5xl text-white/90">
                  Научная библиотека
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Откройте для себя тысячи научных книг и учебных материалов.
                Бесплатный доступ для всех.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={routes.books}>
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Начать поиск
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href={routes.categories}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                  >
                    Категории
                  </Button>
                </Link>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white relative -mt-20 mx-4 md:mx-8 rounded-3xl shadow-2xl z-20">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-cyan-100 text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Почему выбирают нас?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Мы создали платформу, которая делает обучение доступным и увлекательным
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.color} rounded-full opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`} />
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Featured Books Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Популярные книги
                </h2>
                <p className="text-gray-600">Самые востребованные материалы</p>
              </div>
              <Link href={routes.books}>
                <Button variant="outline" className="group border-2 hover:border-purple-500 hover:text-purple-600">
                  Все книги
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {booksLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[3/4] bg-gray-200 rounded-3xl mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  ))
                : booksData?.items?.slice(0, 4).map((book, index) => (
                    <Link key={book.id} href={routes.book(book.id)}>
                      <div
                        className="group cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
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
                                   'from-orange-500 via-red-500 to-pink-500'][index % 4]
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
                                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                  <BookOpenIcon className="w-10 h-10 text-white" />
                                </div>
                                <p className="text-white/90 text-sm font-medium text-center line-clamp-2">{book.title}</p>
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
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-0 transition-transform">
                            <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
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
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </Container>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Категории
                </h2>
                <p className="text-white/60">Выберите интересующую область</p>
              </div>
              <Link href={routes.categories}>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Все категории
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoriesLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
                  ))
                : (Array.isArray(categories) ? categories : []).slice(0, 8).map((category, index) => (
                    <Link key={category.id} href={routes.category(category.id)}>
                      <div
                        className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 group-hover:from-purple-500/40 group-hover:to-cyan-500/40 transition-all duration-300" />

                        {/* Border Glow */}
                        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                          <BookOpenIcon className="w-8 h-8 text-white/50 mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                          <h3 className="text-white font-semibold text-center group-hover:text-cyan-300 transition-colors">
                            {category.name}
                          </h3>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-600 text-sm mb-6">
                <StarIcon className="w-4 h-4" />
                <span>Присоединяйтесь бесплатно</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Начните учиться
                <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"> сегодня</span>
              </h2>

              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Зарегистрируйтесь и получите доступ ко всем функциям платформы.
                Отслеживайте историю скачиваний и создавайте свою библиотеку.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={routes.register}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-10 py-4 text-lg shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Создать аккаунт
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={routes.about}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 px-10 py-4 text-lg hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
                  >
                    Узнать больше
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
