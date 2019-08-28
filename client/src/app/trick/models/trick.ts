import { IUserTrick } from '../../user/model/userTrick';

export interface ITrick {
  id?: number;
  name: string;
  complexity: number;
  description: string;
  videoKey?: string;
  UserTrick?: IUserTrick;
}
