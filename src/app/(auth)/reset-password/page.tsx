'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validators';
import { useResetPassword } from '@/hooks/useAuth';
import { routes } from '@/config';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ResetPasswordPage() {
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword(data);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
        Новый пароль
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Введите код из email и новый пароль
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Код подтверждения"
          type="text"
          maxLength={6}
          placeholder="000000"
          {...register('code')}
          error={errors.code?.message}
        />

        <Input
          label="Новый пароль"
          type="password"
          autoComplete="new-password"
          {...register('newPassword')}
          error={errors.newPassword?.message}
        />

        <Input
          label="Подтверждение пароля"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" className="w-full" isLoading={isPending}>
          Сменить пароль
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link
          href={routes.login}
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Вернуться к входу
        </Link>
      </p>
    </>
  );
}
