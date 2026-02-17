'use client';

import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { routes, config } from '@/config';

const footerLinks = {
  resources: [
    { name: 'Все книги', href: routes.books },
    { name: 'Категории', href: routes.categories },
  ],
  company: [
    { name: 'О нас', href: routes.about },
  ],
  legal: [
    { name: 'Политика конфиденциальности', href: '#' },
    { name: 'Условия использования', href: '#' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href={routes.home} className="flex items-center gap-2">
              <BookOpenIcon className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white">
                {config.siteName}
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-md">
              Научная библиотека с широким выбором учебных материалов для студентов,
              преподавателей и исследователей.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Ресурсы
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Компания
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm text-center text-gray-400">
            &copy; {currentYear} {config.siteName}. Все права защищены. 
          </p>
        </div>
      </div>
    </footer>
  );
}
