'use client';

import {
  EnvelopeIcon,
  EyeIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAboutUs } from '@/hooks/useAbout';

export default function AboutPage() {
  const { data: about, isLoading } = useAboutUs();

  if (isLoading) {
    return (
      <div className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-10 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {about?.title || 'О нас'}
          </h1>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-600 whitespace-pre-wrap">
              {about?.content ||
                'Информация о нашей научной библиотеке будет добавлена позже.'}
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card variant="bordered">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <RocketLaunchIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Наша миссия
                  </h2>
                </div>
                <p className="text-gray-600">
                  {about?.mission ||
                    'Сделать научные знания доступными для каждого.'}
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                    <EyeIcon className="h-5 w-5 text-secondary-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Наше видение
                  </h2>
                </div>
                <p className="text-gray-600">
                  {about?.vision ||
                    'Стать ведущей платформой для научного образования.'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <Card variant="bordered">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                  <EnvelopeIcon className="h-5 w-5 text-accent-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Связаться с нами
                </h2>
              </div>
              <p className="text-gray-600">
                По всем вопросам обращайтесь на почту:{' '}
                <a
                  href={`mailto:${about?.contactEmail || 'info@sciencehub.com'}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {about?.contactEmail || 'info@sciencehub.com'}
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
