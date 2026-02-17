'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/components/ui/Toast';
import { routes } from '@/config';
import {
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from '@/types';

export function useLogin() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      success('Вы успешно вошли в систему');
      router.push(routes.home);
    },
    onError: (err: Error) => {
      error(err.message || 'Ошибка входа');
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const { register } = useAuthStore();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      success('Регистрация успешна! Проверьте email для подтверждения');
      router.push(routes.verifyEmail);
    },
    onError: (err: Error) => {
      error(err.message || 'Ошибка регистрации');
    },
  });
}

export function useVerifyEmail() {
  const router = useRouter();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
    onSuccess: () => {
      success('Email успешно подтверждён!');
      router.push(routes.login);
    },
    onError: (err: Error) => {
      error(err.message || 'Неверный код подтверждения');
    },
  });
}

export function useResendVerificationCode() {
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (email: string) => authApi.resendVerificationCode(email),
    onSuccess: () => {
      success('Код подтверждения отправлен повторно');
    },
    onError: (err: Error) => {
      error(err.message || 'Ошибка отправки кода');
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onSuccess: () => {
      success('Инструкции по сбросу пароля отправлены на email');
      router.push(routes.resetPassword);
    },
    onError: (err: Error) => {
      error(err.message || 'Ошибка отправки запроса');
    },
  });
}

export function useResetPassword() {
  const router = useRouter();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: () => {
      success('Пароль успешно изменён!');
      router.push(routes.login);
    },
    onError: (err: Error) => {
      error(err.message || 'Ошибка сброса пароля');
    },
  });
}

export function useChangePassword() {
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
    onSuccess: () => {
      success('Пароль успешно изменён!');
    },
    onError: (err: Error) => {
      error(err.message || 'Ошибка смены пароля');
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { success } = useToast();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      success('Вы вышли из системы');
      router.push(routes.home);
    },
  });
}
