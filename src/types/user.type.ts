export type Profile = {
  _id: string
  name: string
  gender: string
  photo: string
}

export type User = {
  profile: Profile
  token: string
}

export type RegisterFormValues = {
  name: string
  gender: string
  email: string;
  password: string
  confirmPassword: string
}
