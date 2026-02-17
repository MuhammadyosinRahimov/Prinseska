'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { verifyEmailSchema, VerifyEmailFormData } from '@/lib/validators';
import { useVerifyEmail, useResendVerificationCode } from '@/hooks/useAuth';
import { routes } from '@/config';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
  const { mutate: resendCode, isPending: isResending } = useResendVerificationCode();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const watchedEmail = watch('email');

  const onSubmit = (data: VerifyEmailFormData) => {
    setEmail(data.email);
    verifyEmail(data);
  };

  const handleResend = () => {
    if (watchedEmail || email) {
      resendCode(watchedEmail || email);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
        Подтверждение Email
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Введите код, отправленный на ваш email
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

        <Button type="submit" className="w-full" isLoading={isVerifying}>
          Подтвердить
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-sm font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50"
        >
          {isResending ? 'Отправка...' : 'Отправить код повторно'}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
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
