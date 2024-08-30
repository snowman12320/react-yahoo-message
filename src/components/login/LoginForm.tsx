// eslint-disable-next-line import/no-extraneous-dependencies
import liff from '@line/liff';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, DevTool } from '@/core/form';

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
import {
  login, lineLogin, KEY_TOKEN, storeInStorage,
} from '@/api';
import { LOGIN_SCHEMA } from '@/constants';
import { useToast } from '@/components/ui/use-toast';
import { useLoading } from '@/hooks';

export function LoginForm() {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: {
      email: 'william01@gmail.com',
      password: 'a11111111',
    },
    mode: 'onChange',
  });

  const submitLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login({
        email: values.email,
        password: values.password,
      });

      await toast({
        description: '一般登入成功',
        variant: 'success',
      });
      navigate('/optionList/');
    } catch (err) {
      console.error(err);
      toast({
        description: (err as Error).message,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const submitLineLogin = async () => {
    setLoading(true);
    try {
      await liff.login();
    } catch (err) {
      console.error(err);
      toast({
        description: (err as Error).message,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storeLineToken = async () => {
      const isLoggedIn = await liff.isLoggedIn();

      if (isLoggedIn) {
        const lineProfile = await liff.getProfile();
        const {
          userId, displayName, pictureUrl, statusMessage,
        } = lineProfile;

        const {
          data: { token: lineToken },
        } = await lineLogin({
          lineUserId: userId,
          lineDisplayName: displayName,
          linePictureUrl: pictureUrl,
          statusMessage,
        });

        if (lineToken) {
          storeInStorage(KEY_TOKEN, lineToken, 'SESSION');
          navigate('/optionList/');
          toast({
            description: 'LINE 登入成功',
            variant: 'success',
          });
        }
      }
    };
    storeLineToken();
  }, [navigate, toast]);

  return (
    <>
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

          <div className="text-center win7">
            <Button
              className="button"
              type="button"
              onClick={submitLineLogin}
            >
              LINE 登入
            </Button>
          </div>

          <div className="text-center">
            <Link to="/login/RegisterPage">申請新的Yahoo!奇摩帳號...</Link>
          </div>
        </form>
      </Form>

      <DevTool control={loginForm.control} />
    </>
  );
}
