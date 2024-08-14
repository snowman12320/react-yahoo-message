import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginFormValues } from '@/types';
import { setCurrentUser } from '@/features/userSlice';
import { setLoading } from '@/features/loadingSlice';
import { login } from '@/api';
import { LOGIN_SCHEMA } from '@/constants';

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginForm = useForm({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: {
      email: 'william01@gmail.com',
      password: 'a11111111',
    },
  });

  const submitLogin = async (values: LoginFormValues) => {
    dispatch(setLoading(true));
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });

      await dispatch(setCurrentUser(response.data.profile));
      navigate('/optionList/');
    } catch (err) {
      // console.error('Login failed:', err);
      // alert('登入失敗');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(submitLogin)}
        className="space-y-8"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-[200px] mx-auto">
              <FormLabel>登入帳號</FormLabel>
              <FormControl>
                <Input
                  className=""
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-[200px] mx-auto">
              <FormLabel>登入密碼</FormLabel>
              <FormControl>
                <Input
                  className=""
                  type="password"
                  placeholder="請輸入密碼"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="text-center win7">
          <Button
            className="button"
            type="submit"
          >
            登入
          </Button>
        </div>

        <div className="text-center">
          <Link to="/login/RegisterPage">申請新的Yahoo!奇摩帳號...</Link>
        </div>
      </form>
    </Form>
  );
}
