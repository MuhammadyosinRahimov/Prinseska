'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpenIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookDetailsSkeleton, BookCardSkeleton } from '@/components/ui/Skeleton';
import { useBook, useBooksByCategory } from '@/hooks/useBooks';
import { booksApi } from '@/lib/api/books';
import { routes, config } from '@/config';
import { formatBytes, formatDate } from '@/lib/utils';

export default function BookPage() {
  const params = useParams();
  const id = params.id as string;
  const [isDownloading, setIsDownloading] = useState(false);

  const { data: book, isLoading } = useBook(id);
  const { data: relatedBooks, isLoading: relatedLoading } = useBooksByCategory(
    book?.categoryId || ''
  );

  const handleDownload = async () => {
    const bookId = book?.id || id;

    if (!bookId) {
      console.error('No book ID available for download');
      return;
    }

    setIsDownloading(true);

    try {
      // Get the PDF as blob
      const blob = await booksApi.downloadBook(bookId);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = book?.pdfFileName || `${book?.title || 'book'}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      const downloadUrl = booksApi.getDownloadUrl(bookId);
      window.open(downloadUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const breadcrumbs = [
    { label: 'Книги', href: routes.books },
    { label: book?.title || 'Загрузка...' },
  ];

  if (isLoading) {
    return (
      <div className="py-8">
        <Container>
          <BookDetailsSkeleton />
        </Container>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="py-8">
        <Container>
          <div className="text-center py-16">
            <BookOpenIcon className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Книга не найдена
            </h3>
            <Link href={routes.books}>
              <Button variant="outline" className="mt-4">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Вернуться к каталогу
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const filteredRelatedBooks = relatedBooks
    ?.filter((b) => b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="py-8">
      <Container>
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden sticky top-24">
              {book.images?.[0] ? (
                <img
                  src={book.images[0].imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpenIcon className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{book.author}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge
                variant={
                  book.difficulty === 'Beginner'
                    ? 'success'
                    : book.difficulty === 'Intermediate'
                    ? 'warning'
                    : 'danger'
                }
              >
                {config.difficultyLabels[book.difficulty]}
              </Badge>
              {book.category && (
                <Badge variant="primary">{book.category.name}</Badge>
              )}
              {book.audience && (
                <Badge variant="secondary">{book.audience.name}</Badge>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <DocumentTextIcon className="h-5 w-5" />
                <span>{book.pageCount || '—'} стр.</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LanguageIcon className="h-5 w-5" />
                <span>{book.language}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>{book.downloadCount} скач.</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DocumentTextIcon className="h-5 w-5" />
                <span>{formatBytes(book.fileSize)}</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleDownload}
              className="mb-8"
              isLoading={isDownloading}
              disabled={isDownloading}
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              {isDownloading ? 'Скачивание...' : 'Скачать PDF'}
            </Button>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Описание
              </h2>
              <p className="text-gray-600 whitespace-pre-wrap">
                {book.description}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Добавлено:</span>
                  <span className="ml-2 text-gray-900">
                    {formatDate(book.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Обновлено:</span>
                  <span className="ml-2 text-gray-900">
                    {formatDate(book.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {filteredRelatedBooks && filteredRelatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Похожие книги
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <BookCardSkeleton key={i} />
                  ))
                : filteredRelatedBooks.map((relatedBook) => (
                    <Link key={relatedBook.id} href={routes.book(relatedBook.id)}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="aspect-[3/4] bg-gray-200 relative">
                          {relatedBook.images?.[0] ? (
                            <img
                              src={relatedBook.images[0].imageUrl}
                              alt={relatedBook.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpenIcon className="h-16 w-16 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <CardContent>
                          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                            {relatedBook.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {relatedBook.author}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
