import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { config, routes } from '@/config';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href={routes.home} className="flex justify-center items-center gap-2">
          <BookOpenIcon className="h-12 w-12 text-primary-600" />
          <span className="text-2xl font-bold text-gray-900">{config.siteName}</span>
        </Link>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
