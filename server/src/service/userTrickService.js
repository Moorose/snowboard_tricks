const { User, Trick, UserTrick } = require('../models');

exports.joinTrickToUser = async ({ userId, trickId }) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  const trick = await Trick.findByPk(trickId);
  if (!trick) throw new Error('Trick was not found!');
  const [addCount] = await user.addTrick(trick, { through: { is_done: false } });
  if (addCount === 0) throw new Error('Error adding trick to user!');
  const userTrick = await UserTrick.findOne({
    where: {
      UserId: user.dataValues.id,
      TrickId: trick.dataValues.id,
    },
  });
  if (!userTrick) throw new Error('UserTrick was not found!');
  return userTrick;
};

exports.unJoinTrickToUser = async ({ userId, trickId }) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  const [trick] = await user.getTricks({ where: { id: trickId } });
  if (!trick) throw new Error('Tricks were not found!');
  const removeCount = await user.removeTrick(trick);
  if (removeCount === 0) throw new Error('Remove error!');
};

exports.markTrick = async ({ is_done, userId, trickId }) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  const [trick] = await user.getTricks({ where: { id: trickId } });
  if (!trick) throw new Error('Trick was not found!');
  await user.addTrick(trick, { through: { is_done } });
  trick.UserTrick.is_done = is_done;
  return trick.UserTrick;
};

exports.getUserListByTrickId = async (trickId) => {
  const trick = await Trick.findByPk(trickId);
  if (!trick) throw new Error('Trick was not found!');
  const users = await trick.getUsers();
  if (!users) throw new Error('Users was not found!');
  return users;
};

exports.getTrickListByUserId = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  const tricks = await user.getTricks();
  if (!tricks) throw new Error('Tricks was not found!');
  return tricks;
};

exports.getUserLevel = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User was not found!');
  const tricks = await exports.getTrickListByUserId(userId);
  const exp = tricks.reduce((sum, trick) => sum + trick.complexity, 0);
  return {
    level: Math.floor(exp / 1000),
    nextExp: Math.ceil(exp / 1000) * 1000,
    exp,
  };
};

exports.getUserTrick = async ({ userId, trickId }) => {
  const userTrick = await UserTrick.findOne({
    where: {
      UserId: userId,
      TrickId: trickId,
    },
  });
  return userTrick;
};

exports.updateUserTrick = async ({
  id, is_done, UserId, TrickId, videoKey,
}) => {
  await UserTrick.update(
    {
      is_done,
      UserId,
      TrickId,
      videoKey,
    },
    {
      where: {
        id,
      },
    },
  );
  const usertrick = await UserTrick.findOne({
    where: {
      UserId,
      TrickId,
    },
  });
  return usertrick;
};
