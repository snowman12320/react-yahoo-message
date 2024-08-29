export type Profile = {
  _id: string
  onlineStatus: string
  messageBoard: string
  name: string
  gender: string
  photo: string
  createdAt: string
  lineUserId?: string
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
