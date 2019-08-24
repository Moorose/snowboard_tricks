const threadService = require("../service/threadService");
// const resultSetter = require("../middlewares/resultSetter");
//
exports.openThread = async ctx => {
    await threadService.openThread(...ctx.params);
    await resultSetter.setResult(ctx, null, 201);
};

exports.getThreadInvite = async ctx => {
    const inviteList = await threadService.getThreadInvite(ctx.params.userId);
    await resultSetter.setResult(ctx, inviteList);
};
exports.acceptInvite = async ctx => {
    await threadService.acceptInvite(ctx.params.inviteId);
    await resultSetter.setResult(ctx, null, 204);
};
exports.getThreadById = async ctx => {
    const thread = await threadService.getThread(ctx.params.threadId);
    await resultSetter.setResult(ctx, thread);
};
exports.leaveThread = async ctx => {
    await threadService.leaveThread(ctx.params.userId, ctx.params.threadId);
    await resultSetter.setResult(ctx, null, 204);
};
exports.getThreadByUser = async ctx => {
    const threadList = await threadService.getThreadByUserId(ctx.params.userId);
    await resultSetter.setResult(ctx, threadList);
};
exports.closeThread = async ctx => {
    await threadService.closeThread(ctx.params.threadId);
    await resultSetter.setResult(ctx, null, 204);
};
exports.addMessage = async ctx => {
    await threadService.addMessage({...ctx.params, ...ctx.request.body});
    await resultSetter.setResult(ctx, null, 201);
};
exports.getMessages = async ctx => {
    const messageList = await threadService.getMessages(ctx.params.threadId);
    await resultSetter.setResult(ctx, messageList);
};
