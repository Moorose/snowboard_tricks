"use strict";
const gradeService = require("../service/gradeService");
const resultSetter = require("../middlewares/resultSetter");
const sessionService = require("../middlewares/checkUser");

exports.joinTrickToUser = async ctx => {
    const user = await sessionService.isUser(1);
    await gradeService.joinTrickToUser(user.id, ctx.params.id);
    await resultSetter.setResult(ctx, null, 201);
};

exports.unJoinTrickToUser = async ctx => {
    const user = await sessionService.isUser(1);
    await gradeService.unJoinTrickToUser(user.id, ctx.params.id);
    await resultSetter.setResult(ctx, null, 204);
};

exports.markTrickAsDone = async ctx => {
    const user = await sessionService.isUser(1);
    await gradeService.markTrick(user.id, ctx.params.id, true);
    await resultSetter.setResult(ctx, null, 201);
};

exports.unmarkTrickAsDone = async ctx => {
    const user = await sessionService.isUser(1);
    await gradeService.markTrick(user.id, ctx.params.id, false);
    await resultSetter.setResult(ctx, null, 204);
};

exports.getUserListByTrickId = async ctx => {
    await sessionService.isUser(1);
    const userList = await gradeService.getUserListByTrickId(ctx.params.id);
    await resultSetter.setResult(ctx, userList);
};

exports.getTrickListByUserId = async ctx => {
    const user = await sessionService.isUser(1);
    const trickList = await gradeService.getTrickListByUserId(user.id);
    await resultSetter.setResult(ctx, trickList);
};
