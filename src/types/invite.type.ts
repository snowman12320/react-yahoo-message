export type toType ={
  _id: string;
  name: string;
  photo: string;
}

export type inviteListType = {
  id: string;
  context: string;
  to: toType;
  from: string;
  status: string;
  name: string;
  photo: string;
  createdAt: string;
}
