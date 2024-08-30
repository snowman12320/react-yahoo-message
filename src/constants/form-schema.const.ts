import * as z from 'zod';

// 用戶名稱欄位的表單驗證規則
const NAME_SCHEMA = z.string().min(2, { message: '用戶名稱至少要有2個字元' });

// 性別欄位的表單驗證規則
const GENDER_SCHEMA = z.enum(['male', 'female', 'secret'], {
  required_error: '請選擇性別',
});

// 電話欄位的表單驗證規則
const PHONE_SCHEMA = z.string().min(10, { message: '請輸入手機號碼' });

// 地址欄位的表單驗證規則
const ADDRESS_SCHEMA = z.object({
  city: z.string().min(3, { message: '請選擇縣市' }),
  county: z.string().min(3, { message: '請選擇區域' }),
  detail: z.string().min(3, { message: '請輸入詳細地址' }),
  zipcode: z.string().min(3, { message: '請輸入郵遞區號' }),
});

// 生日欄位的表單驗證規則
const BIRTHDAY_SCHEMA = z.object({
  year: z.string().min(4, { message: '請輸入年份' }),
  month: z.string().min(2, { message: '請輸入月份' }),
  day: z.string().min(2, { message: '請輸入日期' }),
});

// 同意條款欄位的表單驗證規則
const AGREEMENT_SCHEMA = z.boolean().refine(val => val === true, {
  message: '請同意條款',
});

// Email 欄位的表單驗證規則
const EMAIL_SCHEMA = z
  .string()
  .email({ message: '信箱格式不正確' });

// 密碼欄位的表單驗證規則
const PASSWORD_SCHEMA = z.string().min(8, {
  message: '密碼至少要有8個字元，並包含一個英文字母',
}).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
  message: '密碼必須包含至少一個英文字母和八個數字',
});

// 確認密碼欄位的表單驗證規則
const CONFIRM_PASSWORD_SCHEMA = z.string().min(8, {
  message: '密碼至少要有8個字元，並包含一個英文字母',
}).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
  message: '密碼必須包含至少一個英文字母和八個數字',
});

// 登入表單的表單驗證規則
export const LOGIN_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
});

// 註冊表單的表單驗證規則
export const REGISTRATION_SCHEMA = z
  .object({
    name: NAME_SCHEMA,
    gender: GENDER_SCHEMA,
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
    confirmPassword: CONFIRM_PASSWORD_SCHEMA,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
  });

// 其他表單驗證規則
export const OTHER_FORM_SCHEMA = z.object({
  phone: PHONE_SCHEMA,
  address: ADDRESS_SCHEMA,
  birthday: BIRTHDAY_SCHEMA,
  agreement: AGREEMENT_SCHEMA,
});
