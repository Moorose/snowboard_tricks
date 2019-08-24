const {
    sequelize,
    User,
    UserTrick,
    ThreadParticipant,
    Thread,
    Message
} = require("../models");
const Op = sequelize.Op;

exports.openThread = async (userTrickId) => {
    const userTrick = await UserTrick.findByPk(userTrickId);
    if (!userTrick) throw new Error('User and trick is unrelated!');
    const [createStatus] = await userTrick.createThread({user_id: userTrick.userId, trick_id: userTrick.trickId});
    if (createStatus === 0) throw new Error('Error creating thread');
    const thread = await exports.getThreadByUserId(userTrick.dataValues.UserId);
    const inviteUser = UserTrick.findAll({
        where: {
            TrickId: userTrick.dataValues.TrickId,
            id: {
                [Op.ne]: userTrick.dataValues.id
            }
        },raw:true
    });
    inviteUser.map(invite => addParticipant(invite.UserId, thread.dataValues.id))
};

addParticipant = async (userId, threadId) => {
    const thread = await Thread.findByPk(threadId);
    if (!thread) throw new Error('Thread was not found!');
    const user = await User.findByPk(threadId);
    if (!user) throw new Error('User was not found!');
    const [addCount] = await thread.addUser(user, {through: {in_thread: false}});
    if (addCount === 0) throw new Error('Error adding user to thread');
};

exports.getThreadInvite = async (userId) => {
    const threadInvite = await ThreadParticipant.findAll({
        where: {
            UserId: userId
        },
        raw: true
    });
    return threadInvite.filter(invite => !invite.in_thread)
};

exports.acceptInvite = async (inviteId) => {
    const [updateCount] = await ThreadParticipant.update(
        {in_thread: true}, {
            where: {
                id: inviteId
            }
        });
    if (updateCount === 0) throw new Error('Error accept invite to thread');
};

exports.getThreadById = async (threadId) => {
    return await Thread.findByPk(threadId);
};

exports.leaveThread = async (userId, threadId) => {
    const thread = await Thread.findByPk(threadId);
    if (!thread) throw new Error('Thread was not found!');
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    await thread.removeUser(user);
};

exports.getThreadByUserId = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const thread = await user.getThreads({
        where: {
            in_thread: true // ???
        }
    });
    const threadRaw = await user.getThreads({
        where: {
            in_thread: true // ???
        },
        raw: true
    });
    console.log(thread);
    console.log('   raw data:\n',threadRaw);
    return thread;
};

exports.closeThread = async (threadId) => {
    await Thread.destroy({
        where: {
            id: threadId,
        },
    });
};

exports.addMessage = async ({threadId, userId, body}) => {
    const thread = await Thread.findByPk(threadId);
    if (!thread) throw new Error('Thread was not found!');
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const [createCount] = await Message.create({body, threadId: threadId, UserId: userId});
    if (createCount) throw new Error('Error adding message to thread!');
};

exports.getMessages = async (threadId) => {
    const thread = await Thread.findByPk(threadId);
    if (!thread) throw new Error('Thread was not found!');
    return await thread.getMessages();
};
