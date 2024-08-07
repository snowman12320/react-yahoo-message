import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CryptoJS from 'crypto-js';
import { useForm } from '@/core/form';
import { useNavigate, Link } from '@/core/router';
import { useLocalStorage } from '@/core/use';

import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/';

const formSchema = z
  .object({
    email: z.string().email({ message: '信箱格式不正確' }),
    password: z.string().min(6, {
      message: '密碼至少要有6個字元',
    }),
    confirmPassword: z.string().min(6, {
      message: '密碼至少要有6個字元',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const navigate = useNavigate();
  const [yahooUsers, setyahooUsers] = useLocalStorage('yahooUsers', []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  interface RegisterFormValues {
    email: string;
    password: string;
    confirmPassword: string;
  }

  function submitRegister(values: RegisterFormValues) {
    // 取得本地存儲中的使用者資料
    // const existingUsersData = localStorage.getItem('yahooUsers')
    const existingUsersData = yahooUsers;
    let existingUsers = [] as RegisterFormValues[];

    if (existingUsersData) {
      // existingUsers = JSON.parse(existingUsersData)
      existingUsers = existingUsersData;
    }

    // 檢查是否已經註冊過
    const userExists = existingUsers.some(
      (user: RegisterFormValues) => user.email === values.email,
    );
    if (userExists) {
      // console.log('User already registered with this email:', values.email);
      // alert('此電子郵件已經註冊過，請使用其他電子郵件。');
      navigate('/');
      return;
    }

    // 加密密碼
    const encryptedPassword = CryptoJS.AES.encrypt(
      values.password,
      'secret key 123',
    ).toString();

    // 建立使用者資料物件
    const newUser = {
      email: values.email,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    };

    // 將新使用者資料加入陣列
    existingUsers.push(newUser);

    // 儲存更新後的使用者資料陣列到本地存儲
    // localStorage.setItem('yahooUsers', JSON.stringify(existingUsers))
    setyahooUsers(existingUsers as never);

    // 重置表單
    form.reset();

    // 導向登入頁面
    navigate('/');
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
