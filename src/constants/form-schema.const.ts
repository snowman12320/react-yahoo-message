import * as yup from "yup";

// Email 欄位的表單驗證規則
const EMAIL_SCHEMA = yup
  .string()
  .email("請輸入正確的格式")
  .required("請輸入電子郵件");

// 密碼欄位的表單驗證規則
const PASSWORD_SCHEMA = yup
  .string()
  .min(8, "密碼至少8位數")
  .max(20, "密碼至多20位數")
  .required("請輸入密碼");

// 確認密碼欄位的表單驗證規則
const CONFIRM_PASSWORD_SCHEMA = yup
  .string()
  .oneOf([yup.ref("password"), undefined], "密碼不一致")
  .required("請再次輸入密碼");

// 登入表單的表單驗證規則
export const LOGIN_SCHEMA = yup
  .object()
  .shape({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
  })
  .required();

// 註冊第一步的表單驗證規則
export const REGISTRATION_STEP1_SCHEMA = yup
  .object()
  .shape({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
    confirmPassword: CONFIRM_PASSWORD_SCHEMA,
  })
  .required();

// 註冊第二步的表單驗證規則
export const REGISTRATION_STEP2_SCHEMA = yup
  .object()
  .shape({
    name: yup.string().required("請輸入姓名").default(""),
    phone: yup
      .string()
      .required("請輸入手機號碼")
      .matches(/^09[0-9]{8}$/, "請輸入正確的電話號碼")
      .default(""),
    address: yup.object().shape({
      city: yup.string().required("請選擇縣市").default(""),
      county: yup.string().required("請選擇區域").default(""),
      detail: yup.string().required("請輸入詳細地址").default(""),
      zipcode: yup.string().default(""),
    }),
    birthday: yup.object().shape({
      year: yup.string().default(""),
      month: yup.string().default(""),
      day: yup.string().default(""),
    }),
    agreement: yup.boolean().oneOf([true], "請同意條款").default(false),
  })
  .required();
