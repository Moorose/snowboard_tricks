import { IUser } from "../../user/model/user";
import { ITrick } from "../../trick/models/trick";

export interface IThread {
  id: number;
  user_id: number;
  trick_id: number;
  UserTrickId: number;
  user?: IUser;
  trick?: ITrick;
}
