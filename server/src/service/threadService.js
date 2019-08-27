const {
  User,
  UserTrick,
  ThreadParticipant,
  Thread,
  Message,
} = require('../models');

async function addParticipant(userId, thread, flag) {
  let status = false;
  if (flag) {
    status = true;
  }
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  const participant = await thread.addUser(user, { through: { in_thread: status } });
  if (!participant) throw new Error('Error adding user to thread');
}

exports.openThread = async ({ userId, userTrickId }) => {
  const userTrick = await UserTrick.findByPk(userTrickId);
  if (!userTrick) throw new Error('User and trick is unrelated!');
  if (userTrick.dataValues.is_done) throw new Error('This trick already is done!');
  const thread = await userTrick.createThread({
    user_id: userId,
    trick_id: userTrick.dataValues.TrickId,
  });
  if (!thread) throw new Error('Error creating thread');
  const inviteUser = await UserTrick.findAll({
    where: {
      TrickId: userTrick.dataValues.TrickId,
      is_done: true,
    },
    raw: true,
  });
  inviteUser.map((invite) => addParticipant(invite.UserId, thread));
  await addParticipant(userId, thread, true);
  return thread;
};

exports.getThreadInvite = async (userId) => {
  const threadInvite = await ThreadParticipant.findAll(
    {
      where: {
        UserId: userId,
        in_thread: false,
      },
      raw: true,
    },
  );
  return threadInvite;
};

exports.acceptInvite = async ({ userId, inviteId }) => {
  const [updateCount] = await ThreadParticipant.update(
    { in_thread: true }, {
      where: {
        id: inviteId,
        UserId: userId,
      },
    },
  );
  if (updateCount === 0) throw new Error('Error accept invite to thread');
};

exports.deleteInvite = async ({ userId, inviteId }) => {
  const [deleteCount] = await ThreadParticipant.destroy({
    where: {
      id: inviteId,
      UserId: userId,
    },
  });
  if (deleteCount === 0) throw new Error('Error deleted invite to thread');
};

exports.getThreadById = async (threadId) => {
  const thread = await Thread.findByPk(threadId);
  if (!thread) throw new Error('Thread was not found!');
  return thread;
};

exports.getUsersByThreadId = async (threadId) => {
  const thread = await exports.getThreadById(threadId);
  return await thread.getUsers();
};

exports.leaveThread = async ({ userId, threadId }) => {
  const thread = await Thread.findByPk(threadId);
  if (!thread) throw new Error('Thread was not found!');
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  await thread.removeUser(user);
};

exports.getThreadByUserId = async (userId) => {
  const partList = await ThreadParticipant.findAll({
    where: {
      UserId: userId,
      in_thread: true,
    },
    raw: true,
  });
  const threadList = await Promise.all(
    partList.map((part) => Thread.findOne({
      where: {
        id: part.ThreadId,
      },
    })),
  );
  return threadList;
};

exports.closeThread = async (threadId) => {
  await Thread.destroy({
    where: {
      id: threadId,
    },
  });
};

exports.addMessage = async ({ userId, threadId, body }) => {
  const createCount = await Message.create({
    body,
    ThreadId: threadId,
    UserId: userId,
  });
  if (!createCount) throw new Error('Error adding message to thread!');
  const messageList = await Message.findAll(
    {
      where: {
        ThreadId: threadId,
        UserId: userId,
      },
      raw: true,
    },
  );
  return messageList[messageList.length - 1];
};

exports.getMessages = async (threadId) => {
  const messageList = await Message.findAll(
    {
      where: {
        ThreadId: threadId,
      },
      raw: true,
    },
  );
  return messageList;
};
