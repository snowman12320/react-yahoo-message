import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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
import { LoginFormValues } from '@/components/login/types/form.type'
import { setCurrentUser } from '@/features/userSlice'
import { setLoading } from '@/features/loadingSlice'

const formSchema = z.object({
  email: z.string().email({ message: '信箱格式不正確' }),
  password: z.string().min(6, {
    message: '密碼至少要有6個字元',
  }),
})

export function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'william01@gmail.com',
      password: 'a11111111',
    },
  })

  const submitLogin = async (values: LoginFormValues) => {
    dispatch(setLoading(true))
    try {
      const response = await axios.post(
        'https://one04social-back-end.onrender.com/api/test/v1/user/login',
        {
          email: values.email,
          password: values.password,
        },
      )

      await dispatch(setCurrentUser(response.data.data))
    } catch (err) {
      console.error('Login failed:', err)
      alert('登入失敗')
    } finally {
      dispatch(setLoading(false))
      navigate('/optionList/')
    }
  }

  // https://one04social-back-end.onrender.com/api/test/v1/user/login

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
            <FormItem className='w-[200px] mx-auto'>
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
            <FormItem className='w-[200px] mx-auto'>
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

        <div className='text-center win7'>
          <Button
            className='button'
            type='submit'
          >
            登入
          </Button>
        </div>

        <div className='text-center'>
          <Link to='/login/RegisterPage'>申請新的Yahoo!奇摩帳號...</Link>
        </div>
      </form>
    </Form>
  )
}
