import { zodResolver } from '@hookform/resolvers/zod';

import { useLoading } from '@/hooks';
import { useForm, DevTool } from '@/core/form';
import { useNavigate, Link } from '@/core/router';
import { RegisterFormValues } from '@/types';
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
} from '@/components';
import { register } from '@/api/user.api';
import { REGISTRATION_SCHEMA } from '@/constants';
import { useToast } from '@/components/ui/use-toast';

export function RegisterForm() {
  const navigate = useNavigate();
  const { getIsLoading, setLoading } = useLoading();
  const isLoading = getIsLoading();
  const { toast } = useToast();

  const registerForm = useForm({
    resolver: zodResolver(REGISTRATION_SCHEMA),
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
      setLoading(true);
      const res = await register(values);

      if (res.status === 'success') {
        await toast({
          description: res.message,
          variant: 'success',
        });
        registerForm.reset();
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(submitRegister)}
          className="space-y-8"
        >
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mx-auto w-[200px]">
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
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mx-auto w-[200px]">
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
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mx-auto w-[200px]">
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
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mx-auto w-[200px]">
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
            control={registerForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="mx-auto w-[200px]">
                <FormLabel>用戶性別</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className={`flex ${isLoading ? 'hidden' : ''}`}
                  >
                    <div className="yahoo-btn-cls flex items-center space-x-2">
                      <RadioGroupItem
                        value="male"
                        id="male"
                      />
                      <Label htmlFor="male">男</Label>
                    </div>
                    <div className="yahoo-btn-cls flex items-center space-x-2">
                      <RadioGroupItem
                        value="female"
                        id="female"
                      />
                      <Label htmlFor="female">女</Label>
                    </div>
                    <div className="yahoo-btn-cls flex items-center space-x-2">
                      <RadioGroupItem
                        value="secret"
                        id="secret"
                      />
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

      <DevTool control={registerForm.control} />
    </>
  );
}
