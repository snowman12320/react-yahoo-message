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
