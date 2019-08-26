'use strict';
const {
  User,
  UserTrick,
  ThreadParticipant,
  Thread,
  Message
} = require('../models');

exports.openThread = async ({ userId, userTrickId }) => {
  const userTrick = await UserTrick.findByPk(userTrickId);
  if (!userTrick) throw new Error('User and trick is unrelated!');
  if (userTrick.dataValues.is_done) throw new Error('This trick already is done!');
  const thread = await userTrick.createThread({
    user_id: userId,
    trick_id: userTrick.dataValues.TrickId
  });
  if (!thread) throw new Error('Error creating thread');
  const inviteUser = await UserTrick.findAll({
    where: {
      TrickId: userTrick.dataValues.TrickId,
      is_done: true
    },
    raw: true
  });
  inviteUser.map(invite => addParticipant(invite.UserId, thread));
  return thread;
};

async function addParticipant(userId, thread) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  const ThreadParticipant = await thread.addUser(user, { through: { in_thread: false } });
  if (!ThreadParticipant) throw new Error('Error adding user to thread');
}

exports.getThreadInvite = async (userId) => {
  const threadInvite = await ThreadParticipant.findAll(
    {
      where: {
        UserId: userId,
        in_thread: false
      },
      raw: true
    }
  );
  return threadInvite;
};

exports.acceptInvite = async ({ userId, inviteId }) => {
  const [updateCount] = await ThreadParticipant.update(
    { in_thread: true }, {
      where: {
        id: inviteId,
        UserId: userId
      }
    });
  if (updateCount === 0) throw new Error('Error accept invite to thread');
};

exports.getThreadById = async (threadId) => {
  return await Thread.findByPk(threadId);
};

exports.leaveThread = async ({ userId, threadId }) => {
  const thread = await Thread.findByPk(threadId);
  if (!thread) throw new Error('Thread was not found!');
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  await thread.removeUser(user);
};

exports.getThreadsByUserId = async (userId) => {
  const partList = await ThreadParticipant.findAll({
    where: {
      UserId: userId,
      in_thread: true,
    },
    raw: true
  });
  const threadList = [];
  for (let i = 0; i < partList.length; i++) {
    let thread = await Thread.findOne({
      where: {
        id: partList[i].ThreadId
      }
    });
    threadList.push(thread);
  }
  threadList.push(...await Thread.findAll({
      where: {
        user_id: userId
      },
      raw: true
    })
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
    UserId: userId
  });
  if (!createCount) throw new Error('Error adding message to thread!');
};

exports.getMessages = async (threadId) => {
  return await Message.findAll(
    {
      where: {
        ThreadId: threadId
      },
      raw: true
    }
  );
};
