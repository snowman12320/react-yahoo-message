export type Profile = {
  _id: string;
  onlineStatus: string;
  messageBoard: string;
  name: string;
  gender: string;
  photo: string;
  createdAt: string;
  lineUserId?: string;
};

export type FriendListResponse = {
    onlineStatus: string;
    messageBoard: string;
    _id: string;
    name: string;
    photo: string;
}[];

// user.api.ts <fetchData> function returns a <User> type
export type User = {
  profile: Profile;
  token: string;
  friends:FriendListResponse;
};

export type RegisterFormValues = {
  name: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
};
