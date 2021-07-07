import { ITrick } from '../../trick/models/trick';
import { IUser } from '../../user/model/user';

export interface IThread {
  id: number;
  user_id: number;
  trick_id: number;
  UserTrickId: number;
  user?: IUser;
  trick?: ITrick;
}
