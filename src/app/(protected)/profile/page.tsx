'use client';

import Link from 'next/link';
import {
  UserCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuthStore } from '@/store/authStore';
import { routes, config } from '@/config';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="py-8">
      <Container size="md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Профиль</h1>

        <div className="space-y-6">
          {/* Profile Card */}
          <Card variant="bordered">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar name={user.fullName} size="xl" />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {user.fullName}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                    <Badge
                      variant={
                        user.role === 'SuperAdmin'
                          ? 'danger'
                          : user.role === 'Admin'
                          ? 'warning'
                          : 'primary'
                      }
                    >
                      {config.roleLabels[user.role]}
                    </Badge>
                    {user.isEmailConfirmed && (
                      <Badge variant="success">Email подтверждён</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card variant="bordered">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Информация
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Дата регистрации</p>
                    <p className="text-gray-900">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
                {user.lastLoginAt && (
                  <div className="flex items-center gap-3">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Последний вход</p>
                      <p className="text-gray-900">
                        {formatDate(user.lastLoginAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={routes.profileSettings} className="flex-1">
              <Button variant="outline" className="w-full">
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Настройки
              </Button>
            </Link>
            <Link href={routes.changePassword} className="flex-1">
              <Button variant="outline" className="w-full">
                <KeyIcon className="h-5 w-5 mr-2" />
                Сменить пароль
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
