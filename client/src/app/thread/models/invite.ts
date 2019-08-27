import { ITrick } from '../../trick/models/trick';
import { IUser } from '../../user/model/user';

import { IThread } from './thread';

export interface IInvite {
  id: number;
  in_thread: boolean;
  UserId: number;
  ThreadId: number;
  thread?: IThread;
  trick?: ITrick;
  user?: IUser;
  message?: string;
}
