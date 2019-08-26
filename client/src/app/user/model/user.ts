export interface IUser {
  id?: number;
  nickname: string;
  fullName: string;
  email: string;
  description: string;
}

export const enum EUser {
  USER = 1,
  ADMIN = 2
}
