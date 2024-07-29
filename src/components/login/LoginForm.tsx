import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import CryptoJS from 'crypto-js'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginFormValues } from '@/types/login'
import { setCurrentUser } from '@/features/userSlice';

const formSchema = z.object({
  email: z.string().email({ message: '信箱格式不正確' }),
  password: z.string().min(6, {
    message: '密碼至少要有6個字元',
  }),
})

export function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function submitLogin(values: LoginFormValues) {
    // 取得本地存儲中的使用者資料
    const existingUsersData = localStorage.getItem('yahooUsers')
    let existingUsers = []

    if (existingUsersData) {
      existingUsers = JSON.parse(existingUsersData)
    }

    // 查找是否存在匹配的使用者
    const existingUser = existingUsers.find(user => user.email === values.email)

    // 如果使用者不存在，則提示用戶註冊
    if (!existingUser) {
      alert('該用戶不存在，請先註冊')
      return
    }

    // 將本地存儲中的密碼進行解密
    const decryptedPassword = CryptoJS.AES.decrypt(
    existingUser.password,
      'secret key 123',
    ).toString(CryptoJS.enc.Utf8)

    // 將使用者輸入的密碼與解密後的密碼進行比對
    if (values.password === decryptedPassword) {
      dispatch(setCurrentUser(existingUser));

      // 登入成功後，將使用者資料存儲到狀態管理中
      localStorage.setItem('currentUser', JSON.stringify(existingUser))

      navigate('/optionList/')

      // alert('登入成功')
    } else {
      alert('登入失敗')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitLogin)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>登入帳號</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='example@example.com'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>登入密碼</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='請輸入密碼'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />

        <div className='text-center'>
          <Button
            className='w-[100px]'
            type='submit'
          >
            登入
          </Button>
        </div>

        <div>
          <Link to='/login/RegisterPage'>申請新的Yahoo!奇摩帳號...</Link>
        </div>
      </form>
    </Form>
  )
}
