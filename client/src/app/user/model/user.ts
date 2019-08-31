import { IUserTrick } from './userTrick';

export interface IUser {
  id?: number;
  nickname: string;
  fullName: string;
  email: string;
  description: string;
  userTrick?: IUserTrick;
}

export const enum EUser {
  USER = 1,
  SECOND_USER = 2,
  ADMIN = 3
}
