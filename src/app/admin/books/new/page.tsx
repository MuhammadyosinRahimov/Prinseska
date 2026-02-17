'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { bookSchema, BookFormData } from '@/lib/validators';
import { useCreateBook } from '@/hooks/useBooks';
import { useCategories } from '@/hooks/useCategories';
import { useAudiences } from '@/hooks/useAudiences';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { FileUpload } from '@/components/ui/FileUpload';
import { routes } from '@/config';

const difficultyOptions = [
  { value: 'Beginner', label: 'Начинающий' },
  { value: 'Intermediate', label: 'Средний' },
  { value: 'Advanced', label: 'Продвинутый' },
];

export default function NewBookPage() {
  const router = useRouter();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImages, setCoverImages] = useState<File[]>([]);

  const { mutate: createBook, isPending } = useCreateBook();
  const { data: categories } = useCategories();
  const { data: audiences } = useAudiences();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const categoryOptions = categories?.map((c) => ({ value: c.id, label: c.name })) || [];
  const audienceOptions = audiences?.map((a) => ({ value: a.id, label: a.name })) || [];

  const onSubmit = (data: BookFormData) => {
    if (!pdfFile) return;

    createBook(
      {
        ...data,
        pdfFile,
        coverImages: coverImages.length > 0 ? coverImages : undefined,
      },
      {
        onSuccess: () => {
          router.push(routes.adminBooks);
        },
      }
    );
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href={routes.adminBooks}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Назад к списку
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Добавить книгу</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Название"
                  {...register('title')}
                  error={errors.title?.message}
                />
                <Input
                  label="Автор"
                  {...register('author')}
                  error={errors.author?.message}
                />
                <Textarea
                  label="Описание"
                  rows={6}
                  {...register('description')}
                  error={errors.description?.message}
                />
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Характеристики</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Категория"
                    options={categoryOptions}
                    placeholder="Выберите категорию"
                    {...register('categoryId')}
                    error={errors.categoryId?.message}
                  />
                  <Select
                    label="Аудитория"
                    options={audienceOptions}
                    placeholder="Выберите аудиторию"
                    {...register('audienceId')}
                    error={errors.audienceId?.message}
                  />
                  <Select
                    label="Уровень сложности"
                    options={difficultyOptions}
                    placeholder="Выберите уровень"
                    {...register('difficulty')}
                    error={errors.difficulty?.message}
                  />
                  <Input
                    label="Язык"
                    placeholder="ru, en, etc."
                    {...register('language')}
                    error={errors.language?.message}
                  />
                  <Input
                    label="Количество страниц"
                    type="number"
                    {...register('pageCount', { valueAsNumber: true })}
                    error={errors.pageCount?.message}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>PDF файл</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept=".pdf"
                  onFilesSelected={(files) => setPdfFile(files[0] || null)}
                  helperText="Максимум 50 MB"
                  error={!pdfFile ? 'PDF файл обязателен' : undefined}
                />
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Обложка</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept="image/*"
                  multiple
                  onFilesSelected={setCoverImages}
                  helperText="JPG, PNG или WebP, макс 5 MB"
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full"
              isLoading={isPending}
              disabled={!pdfFile}
            >
              Создать книгу
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
