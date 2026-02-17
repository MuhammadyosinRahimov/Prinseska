'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { registerSchema, RegisterFormData } from '@/lib/validators';
import { useRegister } from '@/hooks/useAuth';
import { routes } from '@/config';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Регистрация
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Полное имя"
          type="text"
          autoComplete="name"
          {...register('fullName')}
          error={errors.fullName?.message}
        />

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Пароль"
          type="password"
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Input
          label="Подтверждение пароля"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" className="w-full" isLoading={isPending}>
          Зарегистрироваться
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Уже есть аккаунт?{' '}
        <Link
          href={routes.login}
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Войти
        </Link>
      </p>
    </>
  );
}
