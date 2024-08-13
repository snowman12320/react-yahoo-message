import { redirect } from 'react-router-dom';
import { fetchData } from '@/api';
import { User, RegisterFormValues } from '@/types';
import { KEY_TOKEN, getFromStorage } from './storage-management.ts';

export const signup = async (params: User) => fetchData<User>('POST', '/user/signup', params);

export const login = async (params: { email: string, password: string }) => fetchData<User>(
  'POST',
  '/api/test/v1/user/login',
  params,
);

export const fetchUser = async () => fetchData<User>('GET', '/api/test/v1/user/profile', undefined);

export const loginGuard = async () => {
  const token = getFromStorage(KEY_TOKEN, 'SESSION');
  if (!token) {
    return redirect('/');
  }
  return null;
};

export const register = async (params: RegisterFormValues) => fetchData<User>('POST', '/api/test/v1/user/register', params);
