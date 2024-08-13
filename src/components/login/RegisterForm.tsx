import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';

import useIsLoading from '@/hooks/useIsLoading';
import { setLoading } from '@/features/loadingSlice';
import { useForm } from '@/core/form';
import { useNavigate, Link } from '@/core/router';
import { RegisterFormValues } from '@/types/';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Label,
} from '@/components/';
import { register } from '@/api/user.api';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: '用戶名稱至少要有2個字元',
    }),
    gender: z.enum(['male', 'female', 'secret'], {
      required_error: '請選擇性別',
    }),
    email: z.string().email({ message: '信箱格式不正確' }),
    password: z.string().min(6, {
      message: '密碼至少要有6個字元',
    }),
    confirmPassword: z.string().min(6, {
      message: '密碼至少要有6個字元',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useIsLoading();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'william',
      gender: 'secret',
      email: 'yahoo01@yahoo.com.tw',
      password: 'a11111111',
      confirmPassword: 'a11111111',
    },
  });

  async function submitRegister(values: RegisterFormValues) {
    try {
      dispatch(setLoading(true));
      const response = await register(values);

      if (response.status === 'success') {
        form.reset();
        navigate('/');
      }
    } catch (error) {
      // POST https://one04social-back-end.onrender.com/api/test/v1/user/register 400 (Bad Request)
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitRegister)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-[200px] mx-auto">
              <FormLabel>信箱帳號</FormLabel>
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
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-[200px] mx-auto">
              <FormLabel>註冊密碼</FormLabel>
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-[200px] mx-auto">
              <FormLabel>確認密碼</FormLabel>
              <FormControl>
                <Input
                  className=""
                  type="password"
                  placeholder="請再次輸入密碼"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {/* 用戶名稱 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-[200px] mx-auto">
              <FormLabel>用戶名稱</FormLabel>
              <FormControl>
                <Input
                  className=""
                  type="text"
                  placeholder="請輸入用戶名稱"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {/* 性別 */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="w-[200px] mx-auto">
              <FormLabel>用戶性別</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className={`flex ${isLoading ? 'hidden' : ''}`}
                >
                  <div className="flex items-center space-x-2 yahoo-btn-cls">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">男</Label>
                  </div>
                  <div className="flex items-center space-x-2 yahoo-btn-cls">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">女</Label>
                  </div>
                  <div className="flex items-center space-x-2 yahoo-btn-cls">
                    <RadioGroupItem value="secret" id="secret" />
                    <Label htmlFor="secret">不透露</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="text-center">
          <Button
            className="w-[100px]"
            type="submit"
          >
            註冊
          </Button>
        </div>

        <div className="text-center">
          <Link to="/">已經有Yahoo!奇摩帳號了...</Link>
        </div>
      </form>
    </Form>
  );
}
