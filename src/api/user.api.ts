import { fetchData } from '@/api';
import { User } from '@/types';
// import { redirect } from 'react-router-dom';

export const signup = async (params: User) => fetchData<User>('POST', '/user/signup', params);

export const login = async (params: { email: string, password: string }) => fetchData<User>(
  'POST',
  '/api/test/v1/user/login',
  params
);

export const fetchUser = async () => fetchData<User | null>('GET', '/user', undefined);

// export const loginGuard = async () => {
//   const token = getFromStorage(KEY_TOKEN, 'LOCAL');
//   if ( token ) {
//     const user = await fetchUser(token);
//     if ( user ) {
//       return redirect('/');
//     }
//   }
//   return null;
// };
