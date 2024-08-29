import { redirect } from 'react-router-dom';

import { fetchData } from '@/api';
import { User, RegisterFormValues, Profile } from '@/types';
import {
  KEY_TOKEN,
  getFromStorage,
} from './storage-management.ts';

export const register = async (params: RegisterFormValues) => fetchData<User>('POST', '/api/test/v1/user/register', params);

export const login = async (params: { email: string; password: string }) => fetchData<User>('POST', '/api/test/v1/user/login', params);

export const lineLogin = async (params: {
  lineUserId: string;
  lineDisplayName: string;
  linePictureUrl?: string;
  statusMessage?: string;
}) => fetchData<User>('POST', '/auth/lineLogin', params);

export const notLoggedGuard = async () => {
  const token = getFromStorage(KEY_TOKEN, 'SESSION');
  if (!token) {
    return redirect('/');
  }
  return null;
};

export const isLoggedGuard = async () => {
  const token = getFromStorage(KEY_TOKEN, 'SESSION');
  if (token) {
    return redirect('/optionList/');
  }
  return null;
};

export const fetchUser = async () => fetchData<User>('GET', '/api/test/v1/user/profile', undefined);

export const updateProfile = async (params: Profile) => fetchData<User>('PUT', '/api/test/v1/user/profile', params);
