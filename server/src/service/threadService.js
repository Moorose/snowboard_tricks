const {User, Trick, UserTrick} = require("../models");

exports.openThread = async (userTrickId) => {
    const userTrick = await UserTrick.findByPk(userTrickId);
    const [createStatus] = await userTrick.createThread({user_id: userTrick.userId, trick_id: userTrick.trickId});
    if (createStatus === 0) throw new Error('Create thread error!')
};
exports.getThread = async (threadId) => {
};
exports.getThreadByUser = async (userId) => {
};
exports.closeThread = async (threadId) => {
};
exports.addMessage = async ({threadId, userId, body}) => {
};
exports.removeMessage = async ({threadId, userId, body}) => {
};
exports.getMessage = async (threadId) => {
};
